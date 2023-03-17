// pages/home/index.js
import { shareImage } from '~/config/index';
import {
  BrokenNetwork,
  Iconfont,
  Image,
  NavBar,
  Readme,
  RichText,
  SwiperGuideAnimation,
  Video,
  VirtualiList,
} from '~/utils/router';
import { navigateTo, shareImageFormat } from '~/utils/util';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    introduceList: [
      {
        label: BrokenNetwork.name,
        path: BrokenNetwork.path,
      },
      {
        label: Iconfont.name,
        path: Iconfont.path,
      },
      {
        label: Image.name,
        path: Image.path,
      },
      {
        label: NavBar.name,
        path: NavBar.path,
      },
      {
        label: RichText.name,
        path: RichText.path,
      },
      {
        label: Video.name,
        path: Video.path,
      },
      {
        label: VirtualiList.name,
        path: VirtualiList.path,
      },
    ],
    Readme,
    businessList: [
      {
        label: SwiperGuideAnimation.name,
        path: SwiperGuideAnimation.path,
      },
    ],
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const imageUrl = shareImageFormat(shareImage);
    return {
      title: '只需一分钟下载即可敏捷开发小程序、基础配置完善',
      imageUrl,
    };
  },

  navigateTo(e) {
    const { path } = e.currentTarget.dataset;
    navigateTo({ url: path });
  },
});
