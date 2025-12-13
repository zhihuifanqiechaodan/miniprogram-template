import { IApiMallBannersGetAllItem, IApiMallCategoriesGetAllItem, IApiMallProductItem } from '@/typings/api-types';
import { mallBannersGetAll } from '@miniprogram/api/banner';
import { mallCategoriesGetAll } from '@miniprogram/api/category';
import { mallProductsGetAll } from '@miniprogram/api/product';
import { setTabBarSelected } from '@miniprogram/utils/util';

// pages/home/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    banners: [] as IApiMallBannersGetAllItem[],
    categories: [] as IApiMallCategoriesGetAllItem[],
    goodsList: [] as IApiMallProductItem[][],
    empty: false,
    pageNum: 1,
    pageSize: 20,
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
  onShow() {
    setTabBarSelected();
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  initData() {
    wx.showLoading({
      title: '加载中',
    });
    Promise.all([
      mallBannersGetAll({ pageNum: 1, pageSize: 5 }),
      mallCategoriesGetAll({ pageNum: 1, pageSize: 8, is_enabled: true }),
      mallProductsGetAll({ pageNum: 1, pageSize: this.data.pageSize, is_enabled: true }),
    ]).then(([mallBannersGetAllRes, mallCategoriesGetAllRes, mallProductsGetAllRes]) => {
      wx.hideLoading();
      this.setData({
        banners: mallBannersGetAllRes.data.records,
        categories: mallCategoriesGetAllRes.data.records,
        goodsList: [mallProductsGetAllRes.data.records],
        empty: !mallProductsGetAllRes.data.records.length,
        nomore: mallProductsGetAllRes.data.pagination.totalPages == this.data.pageSize,
      });
    });
  },
});
