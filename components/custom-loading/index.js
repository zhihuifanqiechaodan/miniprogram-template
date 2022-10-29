// components/custom-loading/custom-loading.js
const { systemInfo } = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      // loading状态
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    systemInfo, // 设备信息
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
