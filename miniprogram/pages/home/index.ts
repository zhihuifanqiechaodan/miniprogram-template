// pages/home/index.ts
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    // Initial data for dashboard
    todatStats: [
      { label: '今日营业额', value: '¥3,248', trend: '', icon: '💰', color: 'bg-green-500' },
      { label: '今日订单', value: '42', trend: '', icon: '🛍️', color: 'bg-blue-500' },
      { label: '客流量', value: '156', trend: '', icon: '👥', color: 'bg-purple-500' },
      { label: '环比增长', value: '+12.5%', trend: '', icon: '📈', color: 'bg-orange-500' },
    ],
    menuItems: [
      { id: 'product', name: '商品管理', icon: '🍱', url: '/packageB/pages/admin-product/index' },
      { id: 'user', name: '分类管理', icon: '👥', url: '' },
      { id: 'order', name: '订单处理', icon: '📋', url: '/packageA/pages/order-list/index' },
      { id: 'stats', name: '数据统计', icon: '📊', url: '' },
      { id: 'settings', name: '门店设置', icon: '⚙️', url: '' },
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

  handleLogout() {
    wx.showToast({
      title: '点击退出',
      icon: 'none',
    });
  },

  onMenuClick(e: WechatMiniprogram.TouchEvent) {
    const { url } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none',
      });
    }
  },
});
