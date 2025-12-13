// packageA/pages/order-confirm/index.ts

import { IApiShoppingCartAddItem, IApiShoppingCartAddSkuOption } from '@/typings/api-types';
import { IApiOrderCreateInfo, IApiOrderCreateInfoReq } from '@/typings/api-types/order';
import { IApiUserShippingAddressDefaultV2Info } from '@/typings/api-types/user';
import { addOrderCreate } from '@miniprogram/api/order';
import { addPayWxWxapp } from '@miniprogram/api/pay';
import { getShopGoodsDetail } from '@miniprogram/api/shop';
import { getShoppingCartInfo } from '@miniprogram/api/shopping-cart';
import { getUserShippingAddressDefaultV2 } from '@miniprogram/api/user';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import { Address, AddressEdit, OrderDetail } from '@miniprogram/utils/router';
import { eventBus, navigateTo, redirectTo } from '@miniprogram/utils/util';
import Toast from '@vant/weapp/toast/toast';

const app: IAppOption = getApp();

enum SubmitSource {
  CART = 0, // 购物车
  DETAIL = 1, // 商品详情页
}
enum PeisongType {
  KD = 'kd', // 快递
  ZQ = 'zq', // 自取
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    submitSource: 0 as SubmitSource,
    goodsList: [] as IApiShoppingCartAddItem[],
    addressInfo: null as IApiUserShippingAddressDefaultV2Info | null,
    peisongType: 'kd' as PeisongType,
    payInfo: null as IApiOrderCreateInfo | null,
    id: 0, // 商品详情直接购买
    sku: '', // 商品详情直接购买
    skuStr: '', // 商品详情直接购买
    selfPickupInfo: {
      contactName: '',
      contactPhone: '',
    },
    remark: '',
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
    const { submitSource, id = 0, sku = '', skuStr = '' } = options;
    this.setData({
      submitSource: Number(submitSource),
      id: Number(id),
      sku: decodeURIComponent(sku),
      skuStr: decodeURIComponent(skuStr),
    });
    this.initData();
    eventBus.addEventListener('onAddressSaved', async () => {
      const { data, code } = await getUserShippingAddressDefaultV2({ token: app.globalData.token });
      if (code === 200) {
        this.setData({
          addressInfo: data,
        });
      } else {
        this.setData({
          addressInfo: null,
        });
      }
    });
    eventBus.addEventListener('onAddressChoose', async () => {
      const { data, code } = await getUserShippingAddressDefaultV2({ token: app.globalData.token });
      if (code === 200) {
        this.setData({
          addressInfo: data,
        });
      } else {
        this.setData({
          addressInfo: null,
        });
      }
    });
    eventBus.addEventListener('onAddressRemove', async () => {
      const { data, code } = await getUserShippingAddressDefaultV2({ token: app.globalData.token });
      if (code === 200) {
        this.setData({
          addressInfo: data,
        });
      } else {
        this.setData({
          addressInfo: null,
        });
      }
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
    eventBus.removeEventListener('onAddressSaved');
    eventBus.removeEventListener('onAddressChoose');
    eventBus.removeEventListener('onAddressRemove');
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
    if (this.data.submitSource === SubmitSource.DETAIL) {
      Promise.all([
        getShopGoodsDetail({ id: this.data.id, token: app.globalData.token }),
        getUserShippingAddressDefaultV2({ token: app.globalData.token }),
      ]).then(([goodsDetailRes, addressInfoRes]) => {
        const setData = {};
        const sku: IApiShoppingCartAddSkuOption[] = [];
        if (this.data.sku && this.data.skuStr) {
          this.data.skuStr
            .split(',')
            .filter((item) => item)
            .forEach((item, index) => {
              if (sku[index]) {
                sku[index].optionName = item.split(':')[0];
                sku[index].optionValueName = item.split(':')[1];
              } else {
                sku[index] = {
                  optionName: item.split(':')[0],
                  optionValueName: item.split(':')[1],
                  optionId: 0,
                  optionValueId: 0,
                };
              }
            });
          this.data.sku
            .split(',')
            .filter((item) => item)
            .forEach((item, index) => {
              sku[index].optionId = Number(item.split(':')[0]);
              sku[index].optionValueId = Number(item.split(':')[1]);
            });
        }

        const goodsListInfo: IApiShoppingCartAddItem = {
          categoryId: goodsDetailRes.data.basicInfo.categoryId,
          goodsId: goodsDetailRes.data.basicInfo.id,
          key: '',
          logisticsId: goodsDetailRes.data.basicInfo.logisticsId,
          minBuyNumber: goodsDetailRes.data.basicInfo.minBuyNumber,
          name: goodsDetailRes.data.basicInfo.name,
          number: 1,
          originalPrice: goodsDetailRes.data.basicInfo.originalPrice,
          overseas: goodsDetailRes.data.basicInfo.overseas,
          pic: goodsDetailRes.data.basicInfo.pic,
          price: goodsDetailRes.data.basicInfo.minPrice,
          priceShopSell: goodsDetailRes.data.basicInfo.priceShopSell,
          score: 0,
          selected: true,
          shopId: goodsDetailRes.data.basicInfo.shopId,
          sku,
          status: goodsDetailRes.data.basicInfo.status,
          statusStr: goodsDetailRes.data.basicInfo.statusStr,
          stores: goodsDetailRes.data.basicInfo.stores,
          type: goodsDetailRes.data.basicInfo.type,
          weight: goodsDetailRes.data.basicInfo.weight,
        };
        if (goodsDetailRes.code === 200) {
          Object.assign(setData, { goodsList: [goodsListInfo] });
        } else {
          Toast(goodsDetailRes.msg);
        }
        if (addressInfoRes.code === 200) {
          Object.assign(setData, { addressInfo: addressInfoRes.data });
        }
        addOrderCreate({
          token: app.globalData.token,
          goodsJsonStr: JSON.stringify([
            {
              propertyChildIds: this.data.sku,
              goodsId: goodsDetailRes.data.basicInfo.id,
              number: 1,
            },
          ]),
          peisongType: this.data.peisongType,
          calculate: true,
        }).then((res) => {
          if (res.code === 200) {
            Object.assign(setData, { payInfo: res.data });
            this.setData(setData);
          } else {
            Toast(res.msg);
          }
          Loading.clear();
        });
      });
    }
    if (this.data.submitSource === SubmitSource.CART) {
      Promise.all([
        getShoppingCartInfo({ token: app.globalData.token }),
        getUserShippingAddressDefaultV2({ token: app.globalData.token }),
      ]).then(([shippingCarInfoRes, addressInfoRes]) => {
        const setData = {};
        if (shippingCarInfoRes.code === 200) {
          Object.assign(setData, { goodsList: shippingCarInfoRes.data.items.filter((item) => item.selected) });
        }
        if (addressInfoRes.code === 200) {
          Object.assign(setData, { addressInfo: addressInfoRes.data });
        }
        addOrderCreate({
          token: app.globalData.token,
          goodsJsonStr: JSON.stringify(
            shippingCarInfoRes.data.items
              .filter((item) => item.selected)
              .map((item) => {
                return {
                  propertyChildIds: item.sku?.map((item) => `${item.optionId}:${item.optionValueId}`).join(),
                  goodsId: item.goodsId,
                  number: item.number,
                };
              })
          ),
          peisongType: this.data.peisongType,
          calculate: true,
        }).then((res) => {
          if (res.code === 200) {
            Object.assign(setData, { payInfo: res.data });
            this.setData(setData);
          } else {
            Toast(res.msg);
          }
          Loading.clear();
        });
      });
    }
  },

  // 切换配送方式
  handleDeliveryChange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      peisongType: e.currentTarget.dataset.peisongType,
    });
    this.initData();
  },

  handleAddressClick() {
    if (this.data.addressInfo) {
      navigateTo({
        url: Address.pagePath,
      });
    } else {
      navigateTo({ url: AddressEdit.pagePath });
    }
  },

  // 更新自取信息
  onSelfPickupInfoChange(event: WechatMiniprogram.TouchEvent) {
    const { field } = event.currentTarget.dataset;
    const { value } = event.detail;
    this.setData({
      [`selfPickupInfo.${field}`]: value,
    });
  },

  // 更新备注信息
  onRemarkChange(event: any) {
    this.setData({
      remark: event.detail,
    });
  },

  validateOrder() {
    if (this.data.peisongType === 'kd') {
      if (!this.data.addressInfo) {
        Toast('请设置收获地址');
        return false;
      }
    }
    if (this.data.peisongType === 'zq') {
      if (!this.data.selfPickupInfo.contactName || !this.data.selfPickupInfo.contactPhone) {
        Toast('请输入自取信息');
        return false;
      }
    }
    return true;
  },
  handleConfirm() {
    if (!this.validateOrder()) return;
    Loading.show();
    const params: IApiOrderCreateInfoReq = {
      token: app.globalData.token,
      goodsJsonStr: JSON.stringify(
        this.data.goodsList.map((item) => {
          return {
            propertyChildIds: item.sku?.map((item) => `${item.optionId}:${item.optionValueId}`).join(),
            goodsId: item.goodsId,
            number: item.number,
          };
        })
      ),
      remark: this.data.remark,
      peisongType: this.data.peisongType,
    };

    if (this.data.peisongType === 'kd') {
      Object.assign(params, {
        provinceId: this.data.addressInfo?.info.provinceId,
        cityId: this.data.addressInfo?.info.cityId,
        districtId: this.data.addressInfo?.info.districtId,
        address: this.data.addressInfo?.info.address,
        linkMan: this.data.addressInfo?.info.linkMan,
        mobile: this.data.addressInfo?.info.mobile,
      });
    } else if (this.data.peisongType === 'zq') {
      Object.assign(params, {
        extJsonStr: JSON.stringify({
          联系人: this.data.selfPickupInfo.contactName,
          联系电话: this.data.selfPickupInfo.contactPhone,
        }),
      });
    }

    addOrderCreate(params).then((orderCreateRes) => {
      if (orderCreateRes.code === 200) {
        addPayWxWxapp({
          token: app.globalData.token,
          money: orderCreateRes.data.amountReal,
          remark: `支付订单 ：${orderCreateRes.data.id}`,
          nextAction: JSON.stringify({ type: 0, id: orderCreateRes.data.id }),
          payName: `支付订单 ：${orderCreateRes.data.id}`,
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
                    redirectTo({ url: `${OrderDetail.pagePath}?id=${orderCreateRes.data.id}` });
                  },
                });
              },
              fail: (err: WechatMiniprogram.GeneralCallbackResult) => {
                Toast({
                  message: err.errMsg,
                  onClose: () => {
                    redirectTo({ url: `${OrderDetail.pagePath}?id=${orderCreateRes.data.id}` });
                  },
                });
              },
            });
          } else {
            Toast(res.msg);
          }
        });
      } else {
        Loading.clear();
        Toast(orderCreateRes.msg);
      }
    });
  },
});
