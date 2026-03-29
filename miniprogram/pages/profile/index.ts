import { IApiUser } from '@/typings/api-types';
import { getAuthMe } from '@miniprogram/api/auth';
import { Review } from '@miniprogram/utils/router';
import { navigateTo } from '@miniprogram/utils/util';

// pages/profile/index.ts
export {};
const app: IAppOption = getApp();
interface ProfileStat {
  label: string;
  value: string;
  showDivider: boolean;
}

type ProfileMenuType = 'favorites' | 'likes' | 'reviews' | 'settings' | 'about';

interface ProfileMenuItem {
  type: ProfileMenuType;
  label: string;
  icon: string;
  tone: 'orange' | 'red' | 'blue' | 'gray';
}

interface ProfileMenuSection {
  key: string;
  items: ProfileMenuItem[];
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    statsList: [
      {
        label: '点赞',
        value: '12',
        showDivider: true,
      },
      {
        label: '收藏',
        value: '5',
        showDivider: true,
      },
      {
        label: '评价',
        value: '3',
        showDivider: false,
      },
    ] as ProfileStat[],
    menuSections: [
      {
        key: 'interaction',
        items: [
          {
            type: 'favorites',
            label: '我的收藏',
            icon: 'star-o',
            tone: 'orange',
          },
          {
            type: 'likes',
            label: '我的点赞',
            icon: 'like-o',
            tone: 'red',
          },
          {
            type: 'reviews',
            label: '我的评价',
            icon: 'comment-circle-o',
            tone: 'blue',
          },
        ],
      },
      {
        key: 'system',
        items: [
          {
            type: 'settings',
            label: '设置',
            icon: 'setting-o',
            tone: 'gray',
          },
          {
            type: 'about',
            label: '关于我们',
            icon: 'info-o',
            tone: 'gray',
          },
        ],
      },
    ] as ProfileMenuSection[],
    userInfo: null as IApiUser | null,
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
  onShow() {
    if (app.globalData.userInfo) {
      this.initData();
    }
  },

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
    const { type } = e.currentTarget.dataset as { type?: ProfileMenuType };

    if (!type) {
      return;
    }

    if (type === 'reviews') {
      navigateTo({ type: 'switchTab', url: Review.pagePath });
      return;
    }

    wx.showToast({
      title: '功能开发中',
      icon: 'none',
    });
  },
  async initData() {
    const userInfo = await getAuthMe();
    this.setData({
      userInfo,
    });
  },
});
