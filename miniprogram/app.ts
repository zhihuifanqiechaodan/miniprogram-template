import { getNetworkType, getSystemInfoSync, reLaunch } from '@miniprogram/utils/util';
import { Home } from '@miniprogram/utils/router';
import { cloundEnv } from './config/index';

// app.ts
App<IAppOption>({
  globalData: {
    systemInfo: null, // 设备信息
    networkType: '', // 网络类型
    isConnected: true, // 网络状态
    mutedStatus: false, // 静音状态
    isAutoPlayVideo: false, // 非wifi网络播放状态，用于展示提示信息，提示过一次后当前小程序没有重新load不会在提示
    videoContextComponent: null, // VideoContextComponent，VideoContext实例所在的组件，用于处理视频播放相关业务
  },
  async onLaunch() {
    wx.cloud.init({
      env: cloundEnv,
      traceUser: true,
    });
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
    reLaunch({
      url: Home.pagePath,
    });
  },
});
