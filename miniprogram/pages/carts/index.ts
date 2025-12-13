import { IApiMallCartsGetAllItem } from '@/typings/api-types';
import { mallOrdersCreate } from '@miniprogram/api/order';
import { mallCartsGetAll } from '@miniprogram/api/shopping-cart';
const app: IAppOption = getApp();

// pages/carts/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    brokenNetwork: false,
    carts: [] as IApiMallCartsGetAllItem[][],
    empty: false,
    pageNum: 1,
    nomore: false,
    lowerLoading: false,
    refresherTriggered: false,
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  initData() {
    wx.showLoading({
      title: '加载中',
    });
    mallCartsGetAll({ pageNum: 1 }).then((mallCartsGetAllRes) => {
      wx.hideLoading();
      this.setData({
        carts: [mallCartsGetAllRes.data.records],
        empty: !mallCartsGetAllRes.data.records.length,
        nomore: mallCartsGetAllRes.data.pagination.totalPages === 1,
      });
    });
  },
  // 增加一个方法将购物车车的数据提交订单
  submitOrder() {
    mallOrdersCreate({
      cart_ids: this.data.carts.flat().map((cart) => cart._id),
      name: '11',
      phone: '18811683040',
      province: '11',
      province_id: '123',
      city: '11',
      city_id: '123',
      remark: '11',
      detail_address: '详细地址',
    });
  },
});
