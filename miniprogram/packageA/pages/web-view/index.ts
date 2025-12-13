// packageA/pages/web-view/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    webViewSrc: '',
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
    const { webViewSrc } = options;
    this.setData({
      webViewSrc: decodeURIComponent(webViewSrc),
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
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
});
