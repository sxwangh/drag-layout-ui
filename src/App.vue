<template>
  <div id="app">
    <div class="left">
      <div @drag="drag" @dragend="dragend" class="droppable-element" draggable="true" unselectable="on">
        Droppable Element (Drag me!)
      </div>
      <div class="button" @click="getResData()">计算数据</div>
      <div class="button" @click="openNew()">预览生成界面布局</div>
    </div>
    <div class="right">
      <div class="right-top">
        Displayed as <code>[x, y, w, h]</code>:
        <div>
          <div v-for="(item, index) in layout" :key="index">
            <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
          </div>
        </div>
        <div style="margin-top:10px;">getResultData===</div>
        <div style="background: #f4ffd9;display: inline-block;width: 50%;">
          列:<br/>
          默认col-num: {{colNum}}<br/>
        </div>
        <div style="background: #f9f6ff;display: inline-block;width: 50%;">
          行:<br/>
          默认rowHeight: 20px;<br/>
          contentHeight = rowNum * rowHeight + ((rowNum + 1) * margin)<br/>
          拖拽后   通过计算得出rowNum: <span style="color: red">{{rowNum}}</span> ==  用于新页面生成<br/>
        </div>
      </div>
      <!--col-num 列数-->
      <!--row-height 每行的高度 default: 150-->
      <!--vertical-compact 标识布局是否垂直压缩-->
      <!--margin defalut [10,10] 间隔-->
      <div class="right-bottom">
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
    </div>
  </div>
</template>

<script>

import { GridLayout, GridItem } from 'vue-grid-layout';
import dragMixin from './mixin/dragMixin.vue';

// const mouseXY = { x: null, y: null };
// const DragPos = {
//   x: null, y: null, w: 1, h: 1, i: null,
// };


// 设置界面用
function getRowNum(rowHeight, margin=10) {
  // contentHeight = rowNum * rowHeight + ((rowNum + 1) * margin)   == (rowNum * (rowHeight + margin)) + margin  === rowNum * (20 + 10) + 10 === (rowNum * 30) + 10
  const parentRect = document.getElementById('content').getBoundingClientRect();
  const rowNum = (parentRect.height - margin) / (rowHeight + margin);
  return rowNum;
}

export default {
  name: 'App',
  mixins: [
    dragMixin,
  ],
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      // colNum: 10,
      // rowHeight: 20,
      // rowNum: null, // 通过layout获取
      // layout: [
      //   {
      //     x: 0, y: 0, w: 5, h: 14, i: '1',
      //   },
      //   {
      //     x: 5, y: 0, w: 3, h: 1, i: '2',
      //   },
      //   {
      //     x: 5, y: 1, w: 2, h: 13, i: '3',
      //   },
      //   {
      //     x: 7, y: 1, w: 1, h: 13, i: '4',
      //   },
      //   {
      //     x: 8, y: 0, w: 2, h: 14, i: '5',
      //   },
      // ],
    };
  },
  methods: {
    getResData() {
      // get row-num 第二种方法
      // contentHeight = rowNum * rowHeight + ((rowNum + 1) * margin)   == (rowNum * (rowHeight + margin)) + margin  === rowNum * (20 + 10) + 10 === (rowNum * 30) + 10
      const parentRect = document.getElementById('content').getBoundingClientRect();
      this.rowNum = getRowNum(Number(this.rowHeight), 10);
      console.log(`通过计算得出rowNum 为: ${this.rowNum2}`);
      // TODO 生成页： clientHeight / this.rowNum = rowHeight (layout中设置rowHeight);
      // TODO 存储生成数据
      const layoutJson = JSON.stringify(this.layout);
      localStorage.setItem('layoutJson', layoutJson);
      localStorage.setItem('colNum', this.colNum);
      localStorage.setItem('rowNum', this.rowNum);
    },
    // removeItem(val) {
    //   const index = this.layout.map(item => item.i).indexOf(val);
    //   this.layout.splice(index, 1);
    // },
    // drag
    // drag(e) {
    //   const parentRect = document.getElementById('content').getBoundingClientRect();
    //   let mouseInGrid = false;
    //   if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
    //     mouseInGrid = true;
    //   }
    //   if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
    //     this.layout.push({
    //       x: (this.layout.length * 2) % (this.colNum || 12),
    //       y: this.layout.length + (this.colNum || 12), // puts it at the bottom
    //       w: 1,
    //       h: 1,
    //       i: 'drop',
    //     });
    //   }
    //   const index = this.layout.findIndex(item => item.i === 'drop');
    //   if (index !== -1) {
    //     try {
    //       this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none';
    //     } catch {
    //       console.log(e);
    //     }
    //     const el = this.$refs.gridlayout.$children[index];
    //     el.dragging = { top: mouseXY.y - parentRect.top, left: mouseXY.x - parentRect.left };
    //     const new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
    //     if (mouseInGrid === true) {
    //       this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
    //       DragPos.i = String(index);
    //       DragPos.x = this.layout[index].x;
    //       DragPos.y = this.layout[index].y;
    //     }
    //     if (mouseInGrid === false) {
    //       this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
    //       this.layout = this.layout.filter(obj => obj.i !== 'drop');
    //     }
    //   }
    // },
    // dragend(e) {
    //   console.log(e);
    //   const parentRect = document.getElementById('content').getBoundingClientRect();
    //   let mouseInGrid = false;
    //   if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
    //     mouseInGrid = true;
    //   }
    //   if (mouseInGrid === true) {
    //     alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
    //     this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
    //     this.layout = this.layout.filter(obj => obj.i !== 'drop');
    //     // UNCOMMENT below if you want to add a grid-item
    //     this.layout.push({
    //       x: DragPos.x,
    //       y: DragPos.y,
    //       w: 1,
    //       h: 1,
    //       i: Number(DragPos.i) + 1,
    //     });
    //     // this.$refs.gridlayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
    //     // try {
    //     //   this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'block';
    //     // } catch {
    //     //   console.log('e');
    //     // }
    //   }
    // },
    openNew() {
      window.open('/login.html', '_blank');
    },
  },
  created() {
    // 默认初始值 colNum rowHeight layout
    this.layout = [
      {
        x: 0, y: 0, w: 5, h: 14, i: '1',
      },
      {
        x: 5, y: 0, w: 3, h: 1, i: '2',
      },
      {
        x: 5, y: 1, w: 2, h: 13, i: '3',
      },
      {
        x: 7, y: 1, w: 1, h: 13, i: '4',
      },
      {
        x: 8, y: 0, w: 2, h: 14, i: '5',
      },
    ];
    this.colNum = 10;
    this.rowHeight = 20;
    // TODO 1 点击预览：需要通过 rowHeight来计算 rowNum 传递给 生成界面
  },
  mounted() {
    this.addListener();
  },
};
</script>

<style lang="scss" scoped>
  .button {
    height: 30px;
    width: 150px;
    background: #ccccee;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    &:hover {
      opacity: 0.7;
    }
  }
  .droppable-element {
    width: 150px;
    text-align: center;
    background: #fdd;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 0.7;
    }
  }
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height:100%;
    width: 100%;
    display: flex;
    .left {
      width: 300px;
      height: 100%;
      background: lightyellow;
    }
    .right {
      width: calc(100% - 300px);
      height: 100%;
      background: oldlace;
      .right-top {
        height: 300px;
        width: 100%;
        overflow-y: auto;
      }
      .right-bottom {
        height: calc(100% - 300px);
        width: 100%;
        background: #fffbf7;
      }
    }
  }
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
