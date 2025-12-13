import { Device } from '@miniprogram/utils/router';
import { reLaunch } from '@miniprogram/utils/util';

// pages/guide/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: 5 * 1000,
    timeData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  pause() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.pause();
  },
  onChange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      timeData: e.detail,
    });
  },
  onFinish() {
    this.pause();
    reLaunch({ url: Device.pagePath });
  },
  handlePass() {
    this.pause();
    reLaunch({ url: Device.pagePath });
  },
});
