// packageA/pages/goods-detail/index.ts
import { IApiShopGoodsDetailInfoData } from '@/typings/api-types/shop';
import { IApiShoppingCartAddInfo } from '@/typings/api-types/shopping-cart';
import { IApiUserDetailInfo } from '@/typings/api-types/user';
import {
  getShopGoodsDetail,
  addShopGoodsPrice,
  addShopGoodsFavCheck,
  addShopGoodsFavDelete,
  addShopGoodsFavAdd,
} from '@miniprogram/api/shop';
import { addShoppingCartAdd, getShoppingCartInfo } from '@miniprogram/api/shopping-cart';
import { getUserDetail } from '@miniprogram/api/user';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import { Cart, OrderConfirm } from '@miniprogram/utils/router';
import { eventBus, navigateTo, openWeChatCustomerService, reLaunch } from '@miniprogram/utils/util';
import Toast from '@vant/weapp/toast/toast';

enum OperationType {
  AddCart = 1,
  BuyNow = 2,
}
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    id: 0,
    dataInfo: null as IApiShopGoodsDetailInfoData | null,
    customSizePopup: false,
    customSizePopupType: 0,
    chooseSku: '',
    chooseSkuPrice: 0,
    userInfo: null as IApiUserDetailInfo | null,
    isCollect: false,
    shippingCarInfo: null as IApiShoppingCartAddInfo | null,
    currentTab: 0,
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
      id: Number(id),
    });
    if (app.globalData.userInfo) {
      this.initData();
    }
    eventBus.addEventListener('onUserLogin', () => {
      this.initData();
    });
    eventBus.addEventListener('onShoppingCartInfoUpdate', () => {
      getShoppingCartInfo({ token: app.globalData.token }).then((res) => {
        if (res.code === 200) {
          this.setData({
            shippingCarInfo: res.data,
          });
        } else {
          Toast(res.msg);
        }
      });
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
    eventBus.removeEventListener('onShoppingCartInfoUpdate');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  onShareAppMessage() {
    let title = this.data.dataInfo!.basicInfo.name;
    if (this.data.dataInfo!.basicInfo.tags) {
      title += `【${this.data.dataInfo!.basicInfo.tags}】`;
    }
    return {
      title,
      imageUrl: this.data.dataInfo!.pics[0].pic,
    };
  },

  async initData() {
    Loading.show();
    Promise.all([
      getShopGoodsDetail({ id: this.data.id, token: app.globalData.token }),
      addShopGoodsFavCheck({ token: app.globalData.token, goodsId: this.data.id }),
      getShoppingCartInfo({ token: app.globalData.token }),
      getUserDetail({ token: app.globalData.token }),
    ]).then(([goodsDetailRes, favCheckRes, shippingCarInfoRes, getUserDetailRes]) => {
      const setData = {};
      if (goodsDetailRes.code === 200) {
        Object.assign(setData, {
          dataInfo: goodsDetailRes.data,
          displayTags: goodsDetailRes.data.basicInfo.tags ? goodsDetailRes.data.basicInfo.tags.split(',') : [],
        });
      }
      if (favCheckRes.code === 200) {
        Object.assign(setData, { isCollect: true });
      }
      if (shippingCarInfoRes.code === 200) {
        Object.assign(setData, { shippingCarInfo: shippingCarInfoRes.data });
      }
      if (getUserDetailRes.code === 200) {
        Object.assign(setData, {
          userInfo: getUserDetailRes.data,
        });
      }
      if (goodsDetailRes.data.skuList?.length > 0) {
        Object.assign(setData, {
          chooseSku: goodsDetailRes.data.skuList[0].propertyChildIds,
          chooseSkuPrice: goodsDetailRes.data.skuList[0].price,
        });
      } else {
        Object.assign(setData, {
          chooseSku: '',
          chooseSkuPrice: goodsDetailRes.data.basicInfo.minPrice,
        });
      }
      this.setData(setData);
      Loading.clear();
    });
  },

  customSizePopup_onClose() {
    this.setData({
      customSizePopup: false,
    });
  },
  async customSizePopup_handleSpecOptionSelect(e: WechatMiniprogram.TouchEvent) {
    const { propertyChildIds } = e.detail;
    const { token } = app.globalData;
    const { data, code, msg } = await addShopGoodsPrice({
      goodsId: this.data.id,
      token,
      propertyChildIds,
    });
    if (code === 200) {
      this.setData({
        chooseSku: propertyChildIds,
        chooseSkuPrice: data.price,
      });
    } else {
      Toast(msg);
    }
  },
  async handleCollectClick() {
    const { isCollect } = this.data;
    if (isCollect) {
      await addShopGoodsFavDelete({
        token: app.globalData.token,
        goodsId: this.data.id,
      });
    } else {
      await addShopGoodsFavAdd({
        token: app.globalData.token,
        goodsId: this.data.id,
      });
    }
    this.setData({
      isCollect: !isCollect,
    });
  },
  handlePreviewBanner(e: WechatMiniprogram.TouchEvent) {
    wx.previewImage({
      urls: (this.data.dataInfo as IApiShopGoodsDetailInfoData).pics.map((item) => item.pic),
      current: e.currentTarget.dataset.pic,
    });
  },
  handleTabChange(e: WechatMiniprogram.TouchEvent) {
    const tab = Number(e.currentTarget.dataset.tab);
    this.setData({ currentTab: tab });
  },
  handleCartClick() {
    reLaunch({
      url: Cart.pagePath,
    });
  },
  async handleSizeClick(e: WechatMiniprogram.TouchEvent) {
    const type = Number(e.currentTarget.dataset.type);
    if ((this.data.dataInfo as IApiShopGoodsDetailInfoData).skuList?.length > 0) {
      this.setData({
        customSizePopup: true,
        customSizePopupType: type,
      });
    } else {
      if (type === OperationType.AddCart) {
        const { code, msg } = await addShoppingCartAdd({
          token: app.globalData.token,
          goodsId: (this.data.dataInfo as IApiShopGoodsDetailInfoData).basicInfo.id,
          number: 1,
        });
        if (code === 200) {
          Toast('加入购物车');
          eventBus.triggerEventListener('onShoppingCartInfoUpdate');
        } else {
          Toast(msg);
        }
      } else if (type === OperationType.BuyNow) {
        navigateTo({
          url: `${OrderConfirm.pagePath}?submitSource=1&id=${(this.data.dataInfo as IApiShopGoodsDetailInfoData).basicInfo.id}&sku=${encodeURIComponent(this.data.chooseSku)}&skuStr=${(this.data.dataInfo as IApiShopGoodsDetailInfoData).skuList?.find((item) => item.propertyChildIds === this.data.chooseSku)?.propertyChildNames}`,
        });
      }
    }
  },
  handleContact() {
    openWeChatCustomerService();
  },
});
