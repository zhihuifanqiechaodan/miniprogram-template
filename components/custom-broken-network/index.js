// components/custom-broken-network/index.js
const { globalData } = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    systemInfo: globalData.systemInfo, // 设备信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method refresh 刷新
     */
    refresh() {
      this.triggerEvent('refresh');
    },
  },
});
