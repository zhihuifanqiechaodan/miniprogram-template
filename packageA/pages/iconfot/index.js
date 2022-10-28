// packageA/pages/iconfot/index.js
import { Iconfont } from '~/utils/router';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: Iconfont.name,
    icon: 'icon-xiaochengxu',
    size: '80rpx',
    color: '#031c24',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.request({
      url: 'https://raw.githubusercontent.com/zhihuifanqiechaodan/miniprogram-template/master/components/custom-iconfont/README.md',
      success: (value) => {
        this.setData({
          content: value.data,
        });
      },
    });
  },

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
  handleIconChange(e) {
    this.setData({
      icon: e.detail,
    });
  },
  handleSizeChange(e) {
    this.setData({
      size: e.detail,
    });
  },
  handleColorsChange(e) {
    this.setData({
      color: e.detail,
    });
  },
});
