
<script>
/*
  === （设置） ===
  1. @data：
  2. @methods：
              1) drag拖动
              2) dragend拖动确定后layout。push
              3) addListener mounted中调用监听
*/
const mouseXY = { x: null, y: null };
const DragPos = {
  x: null, y: null, w: 1, h: 1, i: null,
};

export default {
  name: 'dragMixin',
  data() {
    return {
      dragDOMs: [
        // {
        //   index: 0,
        //   id: 'intent',
        //   name: '意图',
        // }, {
        //   index: 1,
        //   id: 'image',
        //   name: '画像',
        // }, {
        //   index: 2,
        //   id: 'flow',
        //   name: '流程',
        // }, {
        //   index: 3,
        //   id: 'chat',
        //   name: '对话',
        // }, {
        //   index: 4,
        //   id: 'know',
        //   name: '知识',
        // },
      ],
    };
  },
  methods: {
    // drag
    drag(e, dragDom) {
      console.log(dragDom);
      console.log(e);
      const parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: 'drop',
        });
      }
      const index = this.layout.findIndex(item => item.i === 'drop');
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none';
        } catch {
          console.log(e);
        }
        const el = this.$refs.gridlayout.$children[index];
        el.dragging = { top: mouseXY.y - parentRect.top, left: mouseXY.x - parentRect.left };
        const new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
          this.layout = this.layout.filter(obj => obj.i !== 'drop');
        }
      }
    },
    dragend(e, dragDom) {
      console.log(e);
      console.log(dragDom);
      const parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
        this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
        this.layout = this.layout.filter(obj => obj.i !== 'drop');
        // UNCOMMENT below if you want to add a grid-item
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 1,
          h: 1,
          i: Number(DragPos.i) + 1,
          index: dragDom.index,
          id: dragDom.id,
          name: dragDom.name,
        });
        // DEL left dragableDOM  (拖拽进画布的DOM 从可拖拽列表中移除)
        this.dragDOMs = this.dragDOMs.filter(dom => dom.id !== dragDom.id);
      }
    },
    addListener() {
      document.addEventListener('dragover', (e) => {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      }, false);
    },
  },
};
</script>

<style scoped>

</style>
