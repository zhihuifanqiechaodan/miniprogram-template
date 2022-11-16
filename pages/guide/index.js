// pages/guide/index.js
import lottie from 'lottie-miniprogram';
import { Home } from '~/utils/router';
import { reLaunch } from '~/utils/util';
const { systemInfo } = getApp();

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    _loadAnimationInstance: null,
  },

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
  },

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

  /**
   * @method initData 初始化数据
   */
  initData() {
    wx.createSelectorQuery()
      .select('#canvas')
      .node((res) => {
        const canvas = res.node;
        const context = canvas.getContext('2d');
        canvas.width = systemInfo.windowWidth;
        canvas.height = systemInfo.windowHeight;
        lottie.setup(canvas);
        this._data._loadAnimationInstance = lottie.loadAnimation({
          loop: true,
          autoplay: true,
          animationData: require('~/assets/lotties/122812-death'),
          rendererSettings: {
            context,
          },
        });
      })
      .exec();
  },

  /**
   * @method countDownFinish 倒计时结束处罚
   */
  countDownFinish() {
    this.countDownPause();
    reLaunch({ url: Home.path });
  },

  /**
   * @method reLaunchHome 跳转首页
   */
  reLaunchHome() {
    this.countDownPause();
    reLaunch({ url: Home.path });
  },

  /**
   * @method countDownPause 倒计时暂停
   */
  countDownPause() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.pause();
  },
});
