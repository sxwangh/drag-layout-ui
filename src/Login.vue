<template>
  <div id="login">
    <grid-layout
            id="content"
            ref="gridlayout"
            :layout.sync="layout"
            :col-num="colNum"
            :row-height="rowHeight"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :use-css-transforms="true"
    >
      <!--x 位于第几列-->
      <!--y 位于第几行-->
      <!--w 单元格的初始width, 为colWidth的倍数-->
      <!--h 单元格的初始height, 为colHeight的倍数-->
      <grid-item v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        {{item.i}}
        <span class="remove" @click="removeItem(item.i)">x</span>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>

import { GridLayout, GridItem } from 'vue-grid-layout';
import dragMixin from './mixin/dragMixin.vue';

// 生成页面用
function getRowHeight(rowNum, margin=10) {
  // contentHeight = rowNum * rowHeight + ((rowNum + 1) * margin)
  debugger;
  const parentRect = document.getElementById('content').getBoundingClientRect();
  const rowHeight = (parentRect.height - ((rowNum + 1) * margin)) / rowNum;
  return rowHeight;
}

export default {
  name: 'Login',
  mixins: [
    dragMixin,
  ],
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
    };
  },
  methods: {
    getInitData() {
      // 默认初始值 colNum rowHeight layout
      const layoutJson = localStorage.getItem('layoutJson');
      const colNum = localStorage.getItem('colNum');
      const rowNum = localStorage.getItem('rowNum');
      if (layoutJson && colNum && rowNum) {
        this.layout = JSON.parse(layoutJson);
        this.colNum = Number(colNum);
        debugger;
        this.rowHeight = getRowHeight(Number(rowNum), 10);
      } else {
        alert('从缓存中获取生成数据失败');
      }
    },
  },
  mounted() {
    this.addListener();
    this.getInitData();
  },
};
</script>

<style lang="scss" scoped>
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
  #login {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height:100%;
    width: 100%;
    #content {
      height: 100%;
      width: 100%;
    }
  }
</style>
<style>
  /* grid-layout*/
  .vue-grid-layout {
    background: #eee;
    width: 100%;
  }
  .vue-grid-item {
    box-sizing: border-box; /* todo */
  }
  .vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
  }
  .vue-grid-item .resizing {
    opacity: 0.9;
  }
  .vue-grid-item .static {
    background: #cce;
  }
  .vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
  }
  .vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .minMax {
    font-size: 12px;
  }
  .vue-grid-item .add {
    cursor: pointer;
  }
  .vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
  }
</style>
