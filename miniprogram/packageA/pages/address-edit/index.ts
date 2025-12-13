import { IApiRegionChildInfoItem, IApiRegionProvinceInfoItem } from '@/typings/api-types/region';
import { getRegionProvince, getRegionChild } from '@miniprogram/api/region';
import {
  addUserShippingAddressAdd,
  addUserShippingAddressUpdate,
  getUserShippingAddressDetailV2,
} from '@miniprogram/api/user';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import { eventBus, navigateBack } from '@miniprogram/utils/util';
import Toast from '@vant/weapp/toast/toast';

// packageA/pages/address-edit/index.ts
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    addressInfo: {
      linkMan: '',
      address: '',
      mobile: '',
      isDefault: true,
      provinceStr: '',
      provinceId: '',
      cityStr: '',
      cityId: '',
      areaStr: '',
      districtId: '',
    },
    provinceList: [] as IApiRegionProvinceInfoItem[],
    provincesPopup: false,
    cityList: [] as IApiRegionChildInfoItem[],
    cityPopup: false,
    districtList: [] as IApiRegionChildInfoItem[],
    districtPopup: false,
    id: 0,
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

  // 初始化省份数据
  initData() {
    Loading.show();
    if (this.data.id) {
      getUserShippingAddressDetailV2({
        token: app.globalData.token,
        id: this.data.id,
      }).then((res) => {
        if (res.code !== 200) {
          Loading.clear();
          Toast(res.msg);
          return;
        }
        Promise.all([
          getRegionProvince(),
          getRegionChild({ pid: res.data.info.provinceId }),
          getRegionChild({ pid: res.data.info.cityId }),
        ]).then(([provinceList, cityList, districtList]) => {
          Loading.clear();
          if (provinceList.code !== 200) {
            Toast(provinceList.msg);
            return;
          }
          if (cityList.code !== 200) {
            Toast(cityList.msg);
            return;
          }
          this.setData({
            'addressInfo.linkMan': res.data.info.linkMan,
            'addressInfo.mobile': res.data.info.mobile,
            'addressInfo.address': res.data.info.address,
            'addressInfo.provinceStr': res.data.info.provinceStr,
            'addressInfo.provinceId': res.data.info.provinceId,
            'addressInfo.cityStr': res.data.info.cityStr,
            'addressInfo.cityId': res.data.info.cityId,
            'addressInfo.areaStr': res.data.info.areaStr,
            'addressInfo.districtId': res.data.info.districtId,
            provinceList: provinceList.data,
            cityList: cityList.data,
            districtList: districtList.data,
          });
        });
      });
    } else {
      getRegionProvince().then((res) => {
        Loading.clear();
        if (res.code !== 200) {
          Toast(res.msg);
          return;
        }
        this.setData({
          provinceList: res.data,
        });
      });
    }
  },

  // 处理输入框失焦事件
  handleInputBlur(e: WechatMiniprogram.TouchEvent) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      [`addressInfo.${type}`]: e.detail.value,
    });
  },

  // 处理输入框清空事件
  handleInputClear(e: WechatMiniprogram.TouchEvent) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      [`addressInfo.${type}`]: '',
    });
  },

  // 处理地区选择器点击事件
  handleRegionPickerClick(e: WechatMiniprogram.TouchEvent) {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'provinces':
        this.setData({
          provincesPopup: true,
        });
        break;
      case 'city':
        if (!this.data.addressInfo.provinceId) {
          Toast('请先选择省份');
          return;
        }
        if (!this.data.cityList.length) {
          Toast('该省份暂无城市数据');
          return;
        }
        this.setData({
          cityPopup: true,
        });
        break;
      case 'district':
        if (!this.data.addressInfo.cityId) {
          Toast('请先选择城市');
          return;
        }
        if (!this.data.districtList.length) {
          Toast('该城市暂无区县数据');
          return;
        }
        this.setData({
          districtPopup: true,
        });
        break;
      default:
        break;
    }
  },

  // 处理省份选择器关闭事件
  handleProvincePickerClose() {
    this.setData({
      provincesPopup: false,
    });
  },

  // 处理城市选择器关闭事件
  handleCityPickerClose() {
    this.setData({
      cityPopup: false,
    });
  },

  // 处理区县选择器关闭事件
  handleDistrictPickerClose() {
    this.setData({
      districtPopup: false,
    });
  },

  // 处理省份选择变化事件
  handleProvinceChange(e: WechatMiniprogram.TouchEvent) {
    const province = this.data.provinceList[e.detail.index];
    this.setData({
      'addressInfo.provinceStr': e.detail.value,
      'addressInfo.provinceId': province.id,
      provincesPopup: false,
      cityList: [],
      districtList: [],
      'addressInfo.cityStr': '',
      'addressInfo.cityId': '',
      'addressInfo.areaStr': '',
      'addressInfo.districtId': '',
    });
    this.fetchCityList(province.id);
  },

  // 获取城市列表数据
  fetchCityList(pid: string) {
    Loading.show();
    getRegionChild({ pid }).then((res) => {
      if (res.code === 200) {
        this.setData({
          cityList: res.data,
        });
      } else {
        this.setData({
          cityList: [],
        });
      }
      Loading.clear();
    });
  },

  // 获取区县列表数据
  fetchDistrictList(pid: string) {
    Loading.show();
    getRegionChild({ pid }).then((res) => {
      if (res.code === 200) {
        this.setData({
          districtList: res.data,
        });
      } else {
        this.setData({
          districtList: [],
        });
      }
      Loading.clear();
    });
  },

  // 处理城市选择变化事件
  handleCityChange(e: WechatMiniprogram.TouchEvent) {
    const city = this.data.cityList[e.detail.index];
    this.setData({
      'addressInfo.cityStr': e.detail.value,
      'addressInfo.cityId': city.id,
      cityPopup: false,
      districtList: [],
      'addressInfo.areaStr': '',
      'addressInfo.districtId': '',
    });
    this.fetchDistrictList(city.id);
  },

  // 处理区县选择变化事件
  handleDistrictChange(e: WechatMiniprogram.TouchEvent) {
    const district = this.data.districtList[e.detail.index];
    this.setData({
      'addressInfo.areaStr': e.detail.value,
      'addressInfo.districtId': district.id,
      districtPopup: false,
    });
  },

  // 处理地址保存
  handleSaveAddress() {
    setTimeout(() => {
      const { linkMan, mobile, address, provinceId, cityId, districtId, isDefault } = this.data.addressInfo;
      if (!linkMan) {
        Toast('请填写收件人姓名');
        return;
      }
      if (!mobile) {
        Toast('请填写手机号');
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(mobile)) {
        Toast('请输入正确的手机号');
        return;
      }
      if (!provinceId) {
        Toast('请选择省份');
        return;
      }
      if (this.data.cityList.length && !cityId) {
        Toast('请选择城市');
        return;
      }
      if (this.data.districtList.length && !districtId) {
        Toast('请选择区县');
        return;
      }
      if (!address) {
        Toast('请填写详细地址');
        return;
      }
      Loading.show();
      if (this.data.id) {
        addUserShippingAddressUpdate({
          token: app.globalData.token,
          linkMan,
          mobile,
          address,
          provinceId,
          cityId,
          districtId,
          id: this.data.id,
          isDefault,
        }).then((res) => {
          Loading.clear();
          if (res.code !== 200) {
            Toast(res.msg);
            return;
          }
          Toast('保存成功');
          eventBus.triggerEventListener('onAddressSaved');
          navigateBack();
        });
      } else {
        addUserShippingAddressAdd({
          linkMan,
          mobile,
          address,
          provinceId,
          cityId,
          districtId,
          isDefault,
          token: app.globalData.token,
        }).then((res) => {
          Loading.clear();
          if (res.code !== 200) {
            Toast(res.msg);
            return;
          }
          Toast('保存成功');
          eventBus.triggerEventListener('onAddressSaved');
          navigateBack();
        });
      }
    }, 200);
  },
});
