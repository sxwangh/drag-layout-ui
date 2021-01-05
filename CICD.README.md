##### 第一步:登陆Runner的机器

```java
机器列表：
	172.16.99.17、172.16.99.208、172.16.99.30
默认账户密码：deployer/Emotibot1
```

##### 第二步：注册gitlab-runner

```java
照着wiki上步骤一步一步来
注意记录自己写的tag==下一步需要在.gitlab-ci.yml配置
```

##### 第三步：修改 .gitlab-ci.yml

```yaml
variables:
  MODULE: "admin-ui" # 定义当前分支所属的模块名
  EXECPATH: "/home/deployer/auto_development" # 使用的检测脚本所在的目录，runner：172.16.102.106/234/235

stages:
  - "检查dockerfile"
  - "本地build&push镜像"
  - "发送消息"

check_dockerfile: # 改动一：将两个dockerfile的检查放到一个job中，检测不通过不允许下一个job
  stage: "检查dockerfile"
  before_script:
    - export
  script:
    - bash ${EXECPATH}/dccheck.sh ./docker/Dockerfile
  tags:
    - general-ui-runner
  except:
    - /^*
  only:
    - master
  allow_failure: false

build_dockerfile: # 改动二：将build任务和push任务合二为一
  stage: "本地build&push镜像"
  before_script:
    - export
  script:
    - cd ./docker/
    - echo "start to build image ..." && bash ./build.sh
    - echo "start to push image ..." && bash -x ${EXECPATH}/push_image.sh ./build.env # build.env一定要写对路径，前面有cd了一次，要注意这一点，build.env需要含有的变量：CONTAINER、TAG、IMAGE_NAME
  tags:
    - general-ui-runner
  except:
    - /^*
  only:
    - master
  allow_failure: false

send_suc_message: # 发送消息的任务并行两个，该任务是当前面两个任务都成功时发送消息
  stage: "发送消息"
  before_script:
    - export
  script:
    - python3 ${EXECPATH}/send_message.py https://oapi.dingtalk.com/robot/send?access_token=ff83b25de1437fb8001c92e41b2f52f5c4c82e7f056ea56351d1f5b923a392c2
  tags:
    - general-ui-runner
  except:
    - /^*
  only:
    - master
  when: on_success
  allow_failure: false

send_fail_message: # 发送消息的任务并行两个，该任务是当前面两个任务只要一个任务失败时就会发送消息
  stage: "发送消息"
  before_script:
    - export
  script:
    - python3 ${EXECPATH}/send_message.py https://oapi.dingtalk.com/robot/send?access_token=ff83b25de1437fb8001c92e41b2f52f5c4c82e7f056ea56351d1f5b923a392c2 failed
  tags:
    - general-ui-runner
  except:
    - /^*
  only:
    - master
  when: on_failure
  allow_failure: false

```

###### 注意修改一下几个参数

```java
1.MODULE==模块名字
2.tags==修改成自己注册runner是写的tag名称
3.only==需要接入CI的分支，无需过滤时可以删掉该参数
```

