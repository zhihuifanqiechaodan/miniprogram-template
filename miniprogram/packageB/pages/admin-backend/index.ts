import { mallAdminDataGet } from '@miniprogram/api/admin';
import { AdminBanner, AdminCategory, AdminProduct } from '@miniprogram/utils/router';
import { navigateTo } from '@miniprogram/utils/util';

// packageB/pages/admin-backend/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    adminList: [
      {
        name: '轮播图管理',
        path: AdminBanner.pagePath,
        count: 0,
        icon: '🖼️',
      },
      {
        name: '分类管理',
        path: AdminCategory.pagePath,
        count: 0,
        icon: '📁',
      },
      {
        name: '商品管理',
        path: AdminProduct.pagePath,
        count: 0,
        icon: '📦',
      },
    ],
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
  initData() {
    wx.showLoading({
      title: '加载中',
    });
    mallAdminDataGet().then((mallAdminDataGetRes) => {
      wx.hideLoading();
      if (mallAdminDataGetRes.code !== 200) {
        wx.showToast({
          title: mallAdminDataGetRes.message,
          icon: 'none',
        });
        return;
      }
      this.setData({
        'adminList[0].count': mallAdminDataGetRes.data.bannersCount,
        'adminList[1].count': mallAdminDataGetRes.data.categoriesCount,
        'adminList[2].count': mallAdminDataGetRes.data.productsCount,
      });
    });
  },
  navigateToAdmin(e: WechatMiniprogram.TouchEvent) {
    navigateTo({ url: e.currentTarget.dataset.path });
  },
});
