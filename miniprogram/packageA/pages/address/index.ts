import { IApiUserShippingAddressAddInfo } from '@/typings/api-types/user';
import {
  addUserShippingAddressDelete,
  addUserShippingAddressList,
  addUserShippingAddressUpdate,
} from '@miniprogram/api/user';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import Toast from '@vant/weapp/toast/toast';
import { eventBus, navigateBack, navigateTo } from '@miniprogram/utils/util';
import { AddressEdit } from '@miniprogram/utils/router';

// packageA/pages/address/index.ts
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    addressList: [] as IApiUserShippingAddressAddInfo[],
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
    eventBus.addEventListener('onAddressSaved', () => {
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
    eventBus.removeEventListener('onAddressSaved');
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
    addUserShippingAddressList({ token: app.globalData.token }).then((res) => {
      if (res.code === 200) {
        this.setData({
          addressList: res.data,
        });
      } else {
        this.setData({
          addressList: [],
        });
      }
      Loading.clear();
    });
  },
  handleAddressRemove(e: WechatMiniprogram.TouchEvent) {
    addUserShippingAddressDelete({
      token: app.globalData.token,
      id: e.currentTarget.dataset.id,
    }).then((res) => {
      if (res.code === 200) {
        this.initData();
        eventBus.triggerEventListener('onAddressRemove');
      }
    });
  },
  chooseAddress(e: WechatMiniprogram.TouchEvent) {
    addUserShippingAddressUpdate({
      token: app.globalData.token,
      id: e.currentTarget.dataset.id,
      isDefault: true,
    }).then((res) => {
      if (res.code === 200) {
        navigateBack();
        eventBus.triggerEventListener('onAddressChoose');
      } else {
        Toast(res.msg);
      }
    });
  },
  handleEditAddress(e: WechatMiniprogram.TouchEvent) {
    navigateTo({
      url: `${AddressEdit.pagePath}?id=${e.currentTarget.dataset.id}`,
    });
  },
  handleAddressCreate() {
    navigateTo({
      url: AddressEdit.pagePath,
    });
  },
});
