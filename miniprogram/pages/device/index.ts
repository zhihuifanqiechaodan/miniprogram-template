import Toast from '@miniprogram/miniprogram_npm/@vant/weapp/toast/toast';
import { DeviceTask, SignIn } from '@miniprogram/utils/router';
import { eventBus, navigateTo, setTabBarSelected } from '@miniprogram/utils/util';

const app: IAppOption = getApp();
// pages/device/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    isTodaySignedIn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      isTodaySignedIn: app.globalData.isTodaySignedIn,
    });
    eventBus.addEventListener('onSignInCompleted', () => {
      this.setData({
        isTodaySignedIn: true,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    setTabBarSelected();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    eventBus.removeEventListener('onSignInCompleted');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  onShareAppMessage() {
    return {
      title: '定制方案，专业教程，趣味训练！',
      imageUrl: 'https://cdn-mini.easylook.com.cn/test/de4912a4-3997-4904-ac95-bfaae94d692d.jpg',
    };
  },
  handleStart() {
    navigateTo({ url: DeviceTask.pagePath });
  },
  handleSignIconClick() {
    navigateTo({ url: SignIn.pagePath });
  },
  handleMoreDevice() {
    Toast('加速研发中，敬请期待...');
  },
});
