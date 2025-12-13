// components/custom-nomore/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 显示的文本内容，默认为"暂无更多"
    text: {
      type: String,
      value: '暂无更多',
    },
    // 上下间距
    gap: {
      type: String,
      value: 'normal', // small, normal, large
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
});
