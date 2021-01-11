<script>
/*
    === （设置、 生成） ===
    1. @data  grid-layout 的基础参数 ：colNum / rowHeight / rowNum / layout
    2. @methods  removeItem删除gridItem(设置页或生成拖拽模块， 生成页单纯删除)
  */
export default {
  name: 'dragBasicMixin.vue',
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
    removeItem(dom) {
      const index = this.layout.map(item => item.id).indexOf(dom.id);
      this.layout.splice(index, 1);
      if (this.dragDOMs) {
        debugger;
        this.dragDOMs.splice(dom.index, 0, dom);
      }
    },
  },
};
</script>

<style scoped>

</style>
