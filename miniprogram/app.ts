import { getNetworkType, getSystemInfoSync, navigateTo } from '@miniprogram/utils/util';
import { Home } from '@miniprogram/utils/router';

// app.ts
App<IAppOption>({
  globalData: {
    systemInfo: null, // 设备信息
    networkType: '', // 网络类型
    isConnected: true, // 网络状态
    loadingRequestCount: 0, // Loading 请求计数（用于并发请求场景）
  },
  async onLaunch() {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: () => {
          updateManager.applyUpdate();
        },
      });
    });
    const systemInfo = getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;
    const networkType = await getNetworkType();
    this.globalData.networkType = networkType;
    if (networkType == 'none') {
      this.globalData.isConnected = false;
    }
  },
  onShow() {
    // 监听网络状态变化事件
    wx.onNetworkStatusChange((value) => {
      const { isConnected, networkType } = value;
      this.globalData.networkType = networkType;
      this.globalData.isConnected = isConnected;
    });
  },
  onPageNotFound() {
    navigateTo({
      type: 'reLaunch',
      url: Home.pagePath,
    });
  },
});
