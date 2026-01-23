import { checkNetwork, getCurrentPageInfo } from '@miniprogram/utils/util';

// components/custom-broken-network/index.js
const app: IAppOption = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: String,
      value: '似乎已断开与互联网的连接',
    },
    buttonText: {
      type: String,
      value: '刷新',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo, // 设备信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method handleRefresh 刷新
     */
    async handleRefresh() {
      await checkNetwork();
      const currentPage = getCurrentPageInfo();
      currentPage?.setData({
        brokenNetwork: false,
      });
      currentPage?.initData?.();
    },
  },
});
