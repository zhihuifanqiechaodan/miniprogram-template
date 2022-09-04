// components/custom-broken-network/index.js
const { systemInfo } = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    systemInfo, // 设备信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method handleRefresh 刷新
     */
    handleRefresh() {
      this.triggerEvent('handleRefresh');
    },
  },
});
