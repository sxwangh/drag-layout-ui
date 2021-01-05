#!/bin/bash

rm nginx.conf
echo "rm nginx.conf..."

SELF_IP=`ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}' | head -n1`;
REMOTE_IP=$1

echo "Use self api service: ${SELF_IP}"
echo "Use remote api service: ${REMOTE_IP}"

while read line
do
  echo $line | sed -e "s/\${SELF_IP}/$SELF_IP/g" | \
    sed -e "s/\${REMOTE_IP}/$REMOTE_IP/g"  >> nginx.conf
done < nginx.conf.ui.template

cmd="docker-compose -f ./docker-compose.yml up --force-recreate -d my-emoti-mate"
eval $cmd
