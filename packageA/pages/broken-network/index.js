// packageA/pages/broken-network/index.js
import { BrokenNetwork } from '~/utils/router';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: BrokenNetwork.name,
    verticalCenter: false,
    message: '似乎已断开与互联网的连接',
    buttonText: '刷新',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.request({
      url: 'https://raw.githubusercontent.com/zhihuifanqiechaodan/miniprogram-template/master/components/custom-broken-network/README.md',
      success: (value) => {
        this.setData({
          content: value.data,
        });
      },
      fail: (reason) => {
        console.log(reason);
      },
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  handleMessageChange(e) {
    this.setData({
      message: e.detail,
    });
  },
  handleButtonTextChange(e) {
    this.setData({
      buttonText: e.detail,
    });
  },
  handleVerticalCenterChange(e) {
    this.setData({
      verticalCenter: e.detail,
    });
  },
});
