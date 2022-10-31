// packageA/pages/image/index.js
import { getCustomImage } from '~/api/gitee-service';
import { Image } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork } from '~/utils/util';

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    _refreshInfo: null, // 刷新详情
  },
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    title: Image.name,
    readmeContent: null,
    src: 'https://oss.fabrique.cn/6b01c1f2-80c4-4356-aa33-567c27914c3d.png',
    width: '100rpx',
    height: '100rpx',
    mode: 'aspectFill',
    radius: '0rpx',
    round: false,
    showMenuByLongpress: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initData();
  },

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
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  getCustomImage() {
    return new Promise(async (resolve) => {
      try {
        const response = await getCustomImage();
        resolve(response);
      } catch (error) {
        // 正常加载
        this._data._refreshInfo = {
          method: 'initData',
          params: {},
        };
        this.setData(
          {
            brokenNetwork: true,
          },
          () => {
            Loading.clear();
          }
        );
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },
  async initData() {
    Loading.show();
    const readmeContent = await this.getCustomImage();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  handleSrcChange(e) {
    this.setData({
      src: e.detail,
    });
  },
  handleWidthChange(e) {
    this.setData({
      width: e.detail,
    });
  },
  handleHeightChange(e) {
    this.setData({
      height: e.detail,
    });
  },
  handleModeChange(e) {
    this.setData({
      mode: e.detail,
    });
  },
  handleRadiusChange(e) {
    this.setData({
      radius: e.detail,
    });
  },
  handleRoundChange(e) {
    this.setData({
      round: e.detail,
    });
  },
  handleShowMenuByLongpressChange(e) {
    this.setData({
      showMenuByLongpress: e.detail,
    });
  },
  /**
   * @method refresh 断网刷新
   */
  async refresh() {
    await checkNetwork();
    const { _refreshInfo } = this._data;
    // 刷新详情，方法和参数
    const { method, params } = _refreshInfo;
    this.setData({
      brokenNetwork: false,
    });
    this[method](params);
  },
});
