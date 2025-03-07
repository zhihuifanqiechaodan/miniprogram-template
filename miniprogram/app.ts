import { getSystemInfoSync, reLaunch } from '~/utils/util';
import { Home } from './utils/router';

// app.ts
App<IAppOption>({
  globalData: {
    networkType: '', // 网络类型
    isConnected: true, // 网络状态
    userInfo: null, // 用户信息
    mutedStatus: false, // 静音状态
    isAutoPlayVideo: false, // 非wifi网络播放状态，用于展示提示信息，提示过一次后当前小程序没有重新load不会在提示
    videoContextComponent: null, // VideoContextComponent，VideoContext实例所在的组件，用于处理视频播放相关业务
  },
  systemInfo: getSystemInfoSync(),
  onLaunch() {
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
    this.systemInfo.navbarHeight = this.systemInfo.statusBarHeight + 46;
    console.log(this.systemInfo);

    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
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
      url: Home.path,
    });
  },
});
