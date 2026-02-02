import { navigateTo } from '@miniprogram/utils/util';

// pages/profile/index.ts
export {};
const app: IAppOption = getApp();

interface UserProfile {
  name: string;
  avatar: string;
  initial: string;
  school: string;
  major: string;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    user: {
      name: 'Alex',
      avatar: '',
      initial: 'A',
      school: 'UNSW',
      major: 'Computer Science',
    } as UserProfile,
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
   * 导航到对应页面
   */
  handleNavigate(e: WechatMiniprogram.CustomEvent) {
    const { type } = e.currentTarget.dataset;

    const pageMap: Record<string, string> = {
      favorites: '/pages/favorites/index',
      likes: '/pages/likes/index',
      reviews: '/pages/review/index',
      settings: '/pages/settings/index',
    };

    const url = pageMap[type];
    if (url) {
      navigateTo({ url });
    }
  },
});
