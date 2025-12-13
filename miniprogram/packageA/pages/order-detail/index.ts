import { IApiOrderDetailInfo, ILogisticsTrace } from '@/typings/api-types';
import { addOrderClose, addOrderDelivery, addOrderDetail } from '@miniprogram/api/order';
import { addPayWxWxapp } from '@miniprogram/api/pay';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import Dialog from '@miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '@miniprogram/miniprogram_npm/@vant/weapp/toast/toast';
import { eventBus } from '@miniprogram/utils/util';

// packageA/pages/order-detail/index.ts
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    id: 0,
    dataInfo: null as IApiOrderDetailInfo | null,
    orderLogisticsPopup: false,
    orderLogistics: [] as ILogisticsTrace[],
  },

  /**
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
    const { id } = options;
    this.setData({
      id,
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

  initData() {
    Loading.show();
    addOrderDetail({
      id: this.data.id,
      token: app.globalData.token,
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          dataInfo: res.data,
        });
      }
      Loading.clear();
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
        }).then(() => {
          Loading.clear();
          this.initData();
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
                Toast('支付成功');
              },
              fail: (err: WechatMiniprogram.GeneralCallbackResult) => {
                Toast(err.errMsg);
              },
              complete: () => {
                this.initData();
              },
            });
          } else {
            Toast({
              message: res.msg,
              onClose: () => {
                this.initData();
              },
            });
          }
        });
      })
      .catch(() => {});
  },
  confirmOrder(e: WechatMiniprogram.TouchEvent) {
    Loading.show();
    addOrderDelivery({
      token: app.globalData.token,
      orderId: e.currentTarget.dataset.id,
    }).then(() => {
      Loading.clear();
      this.initData();
    });
  },
  handleOrderLogisticsShippersItemClick(e: WechatMiniprogram.TouchEvent) {
    const traces = this.data.dataInfo?.orderLogisticsShippers.find(
      (item) => item.id === e.currentTarget.dataset.id
    )?.traces;

    if (traces) {
      this.setData({
        orderLogistics: JSON.parse(traces) as ILogisticsTrace[],
        orderLogisticsPopup: true,
      });
    }
  },
  onClose() {
    this.setData({
      orderLogisticsPopup: false,
    });
  },
});
