import { IApiMallCategoriesGetAllItem, IApiMallProductItem } from '@/typings/api-types';
import { ICommonListData } from '@/typings/api-types/common';
import { mallCategoriesGetAll } from '@miniprogram/api/category';
import { mallProductsGetAll } from '@miniprogram/api/product';
import { setTabBarSelected } from '@miniprogram/utils/util';

const app: IAppOption = getApp();

// pages/categories/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    brokenNetwork: false,
    categories: [] as (IApiMallCategoriesGetAllItem & ICommonListData<IApiMallProductItem>)[],
    currentTab: 0,
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
    mallCategoriesGetAll({
      pageNum: 1,
      is_enabled: true,
    }).then((mallCategoriesGetAllRes) => {
      const categories = mallCategoriesGetAllRes.data.records.map((item) => {
        return {
          ...item,
          empty: false,
          data: [] as IApiMallProductItem[][],
          pageNum: 1,
          nomore: false,
          lowerLoading: false,
          refresherTriggered: false,
        };
      });
      if (!categories.length) {
        wx.hideLoading();
        wx.showToast({
          title: '请先添加分类',
          icon: 'none',
        });
        return;
      }
      mallProductsGetAll({
        pageNum: 1,
        category_id: categories[this.data.currentTab]._id,
      }).then((mallProductsGetAllRes) => {
        wx.hideLoading();
        categories[this.data.currentTab].data = [mallProductsGetAllRes.data.records];
        this.setData({
          categories,
        });
      });
    });
  },
});
