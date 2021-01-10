
<script>
const mouseXY = { x: null, y: null };
const DragPos = {
  x: null, y: null, w: 1, h: 1, i: null,
};

export default {
  name: 'dragMixin',
  data() {
    return {
      colNum: null, // 10
      rowHeight: null, // 20 设置界面 （设置界面 需要先通过rowHeight来计算 rowNum）
      rowNum: null, // 通过计算获取 （生成页面需要先通过rowNum来计算 rowHeight）
      layout: [],
      // margin  默认为10
    };
  },
  methods: {
    removeItem(val) {
      const index = this.layout.map(item => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    // drag
    drag(e) {
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
    dragend(e) {
      console.log(e);
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
        });
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
