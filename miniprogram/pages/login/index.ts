import { switchTab } from '@miniprogram/utils/util';

// pages/login/index.ts
export {};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: 'student',
    password: '123456',
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
   * 更新账号输入值
   * @param {WechatMiniprogram.Input} e 输入事件
   * @returns {void} 无返回值
   */
  handleAccountInput(e: WechatMiniprogram.Input) {
    this.setData({
      account: e.detail.value,
    });
  },

  /**
   * 更新密码输入值
   * @param {WechatMiniprogram.Input} e 输入事件
   * @returns {void} 无返回值
   */
  handlePasswordInput(e: WechatMiniprogram.Input) {
    this.setData({
      password: e.detail.value,
    });
  },

  /**
   * 提交登录并进入首页
   * @returns {void} 无返回值
   */
  handleLogin() {
    const { account, password } = this.data;

    if (!account.trim() || !password.trim()) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none',
      });
      return;
    }

    wx.showToast({
      title: '登录成功',
      icon: 'success',
    });

    setTimeout(() => {
      switchTab({ url: '/pages/home/index' });
    }, 300);
  },

  /**
   * 直接进入演示模式
   * @returns {void} 无返回值
   */
  handleDemoLogin() {
    wx.showToast({
      title: '进入演示模式',
      icon: 'none',
    });

    setTimeout(() => {
      switchTab({ url: '/pages/home/index' });
    }, 300);
  },
});
