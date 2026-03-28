import { postAuthLogin } from '@miniprogram/api/auth';
import { Home } from '@miniprogram/utils/router';
import { navigateTo } from '@miniprogram/utils/util';
import Toast from '@vant/weapp/toast/toast';

// pages/login/index.ts
export {};
const app: IAppOption = getApp();

/**
 * 输入框事件
 */
type FieldValueEvent = WechatMiniprogram.CustomEvent & {
  detail: string;
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    email: 'admin@gmail.com', // 登录邮箱
    password: 'gi8TJRh9z85!U9yb!fMEMp', // 登录密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
   * 更新邮箱输入值
   * @param {FieldValueEvent} e 输入事件
   * @returns {void} 无返回值
   */
  handleEmailInput(e: FieldValueEvent) {
    this.setData({
      email: e.detail,
    });
  },

  /**
   * 更新密码输入值
   * @param {FieldValueEvent} e 输入事件
   * @returns {void} 无返回值
   */
  handlePasswordInput(e: FieldValueEvent) {
    this.setData({
      password: e.detail,
    });
  },

  /**
   * 提交登录并进入首页
   * @returns {Promise<void>} 无返回值
   */
  async handleLogin() {
    const { email, password } = this.data;
    if (!email.trim() || !password.trim()) {
      Toast('请输入邮箱和密码');
      return;
    }
    const loginInfo = await postAuthLogin({
      email: email.trim(),
      password: password.trim(),
    });
    app.globalData.loginInfo = loginInfo;
    app.globalData.userInfo = loginInfo.user;
    wx.setStorageSync('loginInfo', loginInfo);
    wx.setStorageSync('userInfo', loginInfo.user);
    navigateTo({ type: 'switchTab', url: Home.pagePath });
  },
});
