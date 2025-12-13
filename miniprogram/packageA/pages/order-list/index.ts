import { IApiOrderListGoodsMapItem, IApiOrderListItem, IApiOrderListlLogisticsItem } from '@/typings/api-types';
import { addOrderClose, addOrderDelivery, addOrderList, addOrderStatistics } from '@miniprogram/api/order';
import { addPayWxWxapp } from '@miniprogram/api/pay';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import Dialog from '@miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '@miniprogram/miniprogram_npm/@vant/weapp/toast/toast';
import { OrderDetail } from '@miniprogram/utils/router';
import { checkNetwork, eventBus, navigateTo } from '@miniprogram/utils/util';

// packageA/pages/order-list/index.ts
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    brokenNetwork: false,
    currentTab: 0,
    refresherTriggered: false,
    lowerLoading: false,
    nomore: false,
    page: 1,
    pageSize: 20,
    orderTab: [
      { label: '全部', count: 0, status: -1 },
      { label: '待付款', count: 0, status: 0 },
      { label: '待发货', count: 0, status: 1 },
      { label: '待收货', count: 0, status: 2 },
      { label: '待评价', count: 0, status: 3 },
    ],
    goodsMap: null as Record<string, IApiOrderListGoodsMapItem> | null,
    logisticsMap: null as Record<string, IApiOrderListlLogisticsItem> | null,
    orderList: [] as IApiOrderListItem[][],
  },

  /**]
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    if (options.scene) {
      const scene = decodeURIComponent(options.scene);
      scene.split('&').forEach((item) => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        options[key] = value;
      });
    }
    const { currentTab = 0 } = options;
    this.setData({
      currentTab: Number(currentTab),
    });
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
  async initData() {
    Loading.show();
    Promise.all([
      addOrderStatistics({ token: app.globalData.token }),
      addOrderList({
        status: this.data.orderTab[this.data.currentTab].status,
        page: 1,
        pageSize: this.data.pageSize,
        token: app.globalData.token,
      }),
    ]).then(([orderInfoRes, orderListRes]) => {
      const setData = {};
      if (orderInfoRes.code === 200) {
        Object.assign(setData, {
          'orderTab[1].count': orderInfoRes.data.count_id_no_pay,
          'orderTab[2].count': orderInfoRes.data.count_id_no_transfer,
          'orderTab[3].count': orderInfoRes.data.count_id_no_confirm,
          'orderTab[4].count': orderInfoRes.data.count_id_no_reputation,
        });
      }
      if (orderListRes.code === 200) {
        Object.assign(setData, {
          goodsMap: orderListRes.data.goodsMap,
          logisticsMap: orderListRes.data.logisticsMap,
          orderList: [orderListRes.data.orderList],
        });
      }
      this.setData(setData);
    });
    Loading.clear();
  },
  async onChange(e: WechatMiniprogram.TouchEvent) {
    const { index } = e.detail;
    this.setData({
      currentTab: index,
      orderListInfo: null,
      lowerLoading: false,
      nomore: false,
      page: 1,
    });
    Promise.all([
      addOrderStatistics({ token: app.globalData.token }),
      addOrderList({
        status: this.data.orderTab[index].status,
        page: 1,
        pageSize: this.data.pageSize,
        token: app.globalData.token,
      }),
    ]).then(([orderInfoRes, orderListRes]) => {
      const setData = {};
      if (orderInfoRes.code === 200) {
        Object.assign(setData, {
          'orderTab[1].count': orderInfoRes.data.count_id_no_pay,
          'orderTab[2].count': orderInfoRes.data.count_id_no_transfer,
          'orderTab[3].count': orderInfoRes.data.count_id_no_confirm,
          'orderTab[4].count': orderInfoRes.data.count_id_no_reputation,
        });
      }
      if (orderListRes.code === 200) {
        Object.assign(setData, {
          goodsMap: orderListRes.data.goodsMap,
          logisticsMap: orderListRes.data.logisticsMap,
          orderList: [orderListRes.data.orderList],
          nomore: orderListRes.data.totalPage === 1,
        });
      } else {
        Object.assign(setData, { goodsMap: null, logisticsMap: null, orderList: [], nomore: true });
      }
      this.setData(setData);
    });
  },
  async refresherrefresh() {
    if (this.data.refresherTriggered) return;
    this.setData({
      refresherTriggered: true,
      nomore: false,
      page: 1,
    });
    Promise.all([
      addOrderStatistics({ token: app.globalData.token }),
      addOrderList({
        status: this.data.orderTab[this.data.currentTab].status,
        page: 1,
        pageSize: this.data.pageSize,
        token: app.globalData.token,
      }),
    ]).then(([orderInfoRes, orderListRes]) => {
      const setData = {};
      if (orderInfoRes.code === 200) {
        Object.assign(setData, {
          'orderTab[1].count': orderInfoRes.data.count_id_no_pay,
          'orderTab[2].count': orderInfoRes.data.count_id_no_transfer,
          'orderTab[3].count': orderInfoRes.data.count_id_no_confirm,
          'orderTab[4].count': orderInfoRes.data.count_id_no_reputation,
        });
      }
      if (orderListRes.code === 200) {
        Object.assign(setData, {
          goodsMap: orderListRes.data.goodsMap,
          logisticsMap: orderListRes.data.logisticsMap,
          orderList: [orderListRes.data.orderList],
          refresherTriggered: false,
          nomore: orderListRes.data.totalPage === 1,
        });
      } else {
        Object.assign(setData, {
          goodsMap: null,
          logisticsMap: null,
          orderList: [],
          refresherTriggered: false,
          nomore: true,
        });
      }
      this.setData(setData);
    });
  },
  async scrolltolower() {
    await checkNetwork();
    if (this.data.lowerLoading || this.data.nomore) return;
    this.setData({
      lowerLoading: true,
    });
    addOrderList({
      status: this.data.orderTab[this.data.currentTab].status,
      page: this.data.page + 1,
      pageSize: this.data.pageSize,
      token: app.globalData.token,
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          goodsMap: Object.assign({}, this.data.goodsMap, res.data.goodsMap),
          logisticsMap: Object.assign({}, this.data.logisticsMap, res.data.logisticsMap),
          [`orderList[${this.data.orderList.length}]`]: res.data.orderList,
          lowerLoading: false,
          nomore: res.data.totalPage === this.data.page + 1,
          page: this.data.page + 1,
        });
      } else {
        this.setData({
          lowerLoading: false,
        });
      }
    });
  },
  confirmOrder(e: WechatMiniprogram.TouchEvent) {
    Loading.show();
    addOrderDelivery({
      token: app.globalData.token,
      orderId: e.currentTarget.dataset.id,
    }).then((res) => {
      Loading.clear();
      if (res.code === 200) {
        this.refresherrefresh();
      }
    });
  },
  cancelOrder(e: WechatMiniprogram.TouchEvent) {
    Dialog.confirm({
      title: '取消订单',
      message: '确认要取消该订单吗？',
    })
      .then(() => {
        Loading.show();
        addOrderClose({
          token: app.globalData.token,
          orderId: e.currentTarget.dataset.id,
        }).then((res) => {
          Loading.clear();
          if (res.code === 200) {
            this.refresherrefresh();
          }
        });
      })
      .catch(() => {});
  },
  payOrder(e: WechatMiniprogram.TouchEvent) {
    Dialog.confirm({
      title: '订单支付',
      message: '确认支付该订单？',
    })
      .then(() => {
        Loading.show();
        addPayWxWxapp({
          token: app.globalData.token,
          money: e.currentTarget.dataset.amountReal,
          remark: `支付订单 ：${e.currentTarget.dataset.id}`,
          nextAction: JSON.stringify({ type: 0, id: e.currentTarget.dataset.id }),
          payName: `支付订单 ：${e.currentTarget.dataset.id}`,
        }).then((res) => {
          Loading.clear();
          if (res.code === 200) {
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType as 'MD5' | 'HMAC-SHA256' | 'RSA',
              paySign: res.data.paySign,
              success: () => {
                Toast({
                  message: '支付成功',
                  onClose: () => {
                    this.refresherrefresh();
                  },
                });
              },
              fail: (err: WechatMiniprogram.GeneralCallbackResult) => {
                Toast({
                  message: err.errMsg,
                });
              },
            });
          } else {
            Toast(res.msg);
          }
        });
      })
      .catch(() => {});
  },
  handleOrderItemClick(e: WechatMiniprogram.TouchEvent) {
    navigateTo({
      url: `${OrderDetail.pagePath}?id=${e.currentTarget.dataset.id}`,
    });
  },
});
