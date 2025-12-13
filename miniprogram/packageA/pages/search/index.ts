import { IApiShopGoodsListV2InfoItem } from '@/typings/api-types';
import { addShopGoodsListV2 } from '@miniprogram/api/shop';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import Dialog from '@miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';
import { checkNetwork, deleteItemSync, eventBus, setItemSync } from '@miniprogram/utils/util';

// packageA/pages/search/index.ts
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    k: '',
    orderBy: '',
    sortList: [
      {
        label: '综合',
        orderBy: '',
      },
      {
        label: '新品',
        orderBy: 'addedDown',
      },
      {
        label: '销量',
        orderBy: 'ordersDown',
      },
      {
        label: '价格',
        orderBy: 'priceUp',
      },
    ],
    goodsList: [] as IApiShopGoodsListV2InfoItem[][],
    page: 1,
    pageSize: 20,
    lowerLoading: false,
    nomore: false,
    keywordList: app.globalData.keywordList,
    goodsRecommend: [] as IApiShopGoodsListV2InfoItem[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.userInfo) {
      this.initData();
    }
    eventBus.addEventListener('onUserLogin', () => {
      this.initData();
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
  onUnload() {
    eventBus.removeEventListener('onUserLogin');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  initData() {
    Loading.show();
    addShopGoodsListV2({
      recommendStatus: 1,
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          goodsRecommend: res.data.result,
        });
      }
      Loading.clear();
    });
  },
  async scrolltolower() {
    await checkNetwork();
    if (this.data.lowerLoading || this.data.nomore) return;
    this.setData({
      lowerLoading: true,
    });
    addShopGoodsListV2({
      k: this.data.k,
      page: this.data.page + 1,
      pageSize: this.data.pageSize,
      orderBy: this.data.orderBy,
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          [`goodsList[${this.data.goodsList.length}]`]: res.data.result,
          page: this.data.page + 1,
          nomore: res.data.totalPage === this.data.page + 1,
          lowerLoading: false,
        });
      } else {
        this.setData({
          lowerLoading: false,
        });
      }
    });
  },
  onSearch(e: WechatMiniprogram.TouchEvent) {
    Loading.show();
    if (e.detail) {
      this.handleKeywordSearch(e.detail as unknown as string);
    }
  },
  handleKeywordSearch(k: string) {
    if (!this.data.keywordList.includes(k)) {
      this.data.keywordList.unshift(k);
      if (this.data.keywordList.length > 15) {
        this.data.keywordList.pop();
      }
      app.globalData.keywordList = this.data.keywordList;
      setItemSync('keywordList', this.data.keywordList);
    } else {
      this.data.keywordList = this.data.keywordList.filter((item) => item !== k);
      this.data.keywordList.unshift(k);
      app.globalData.keywordList = this.data.keywordList;
      setItemSync('keywordList', this.data.keywordList);
    }
    this.setData({
      k,
      keywordList: this.data.keywordList,
    });
    addShopGoodsListV2({
      k,
      page: 1,
      pageSize: this.data.pageSize,
      orderBy: this.data.orderBy,
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          goodsList: [res.data.result],
          nomore: 1 === res.data.totalPage,
        });
      }
      Loading.clear();
    });
  },
  onClear() {
    this.setData({
      k: '',
    });
  },
  handleSortItemClick(e: WechatMiniprogram.TouchEvent) {
    Loading.show();
    this.setData({
      orderBy: e.currentTarget.dataset.orderBy,
    });
    addShopGoodsListV2({
      k: this.data.k,
      page: 1,
      pageSize: this.data.pageSize,
      orderBy: e.currentTarget.dataset.orderBy,
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          goodsList: [res.data.result],
          nomore: 1 === res.data.totalPage,
        });
      }
      Loading.clear();
    });
  },
  handleDeleteHistoryKeyword() {
    Dialog.confirm({
      title: '确定要删除吗？',
      message: '删除后不可恢复',
    })
      .then(() => {
        this.setData({
          keywordList: [],
        });
        app.globalData.keywordList = [];
        deleteItemSync('keywordList');
      })
      .catch(() => {});
  },
  handleKeywordClick(e: WechatMiniprogram.TouchEvent) {
    this.handleKeywordSearch(e.currentTarget.dataset.k);
  },
});
