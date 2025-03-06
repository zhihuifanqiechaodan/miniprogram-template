import { getSystemInfoSync } from '~/utils/util';

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
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
});
