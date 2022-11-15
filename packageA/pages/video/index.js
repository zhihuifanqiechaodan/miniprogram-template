// packageA/pages/video/index.js
import { getCustomIconfont } from '~/api/gitee-service';
import { Video } from '~/utils/router';
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
    title: Video.name,
    icon: 'icon-xiaochengxu',
    size: '80rpx',
    color: '#031c24',
    readmeContent: null,
    videoList: [
      {
        poster:
          'https://oss.fabrique.cn/67a44967-32f3-4fa8-9481-ceb7a8fde958.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'https://oss.fabrique.cn/offwebsite/mp4/%E6%B7%B7%E5%89%AA6-%E6%94%B9%E5%AD%97%E4%BD%93.mp4',
      },
      {
        poster:
          'http://oss.cogo.club/2c64c928-38db-436c-ba4f-a9307b19d489.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'http://oss.cogo.club/2c64c928-38db-436c-ba4f-a9307b19d489.mp4',
      },
      {
        poster:
          'https://oss.fabrique.cn/290664dc-c0ce-4223-b8f0-24ba5aec6332.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto',
        src: 'https://oss.fabrique.cn/290664dc-c0ce-4223-b8f0-24ba5aec6332.mp4',
      },
    ],
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
  getCustomIconfont() {
    return new Promise(async (resolve) => {
      try {
        const response = await getCustomIconfont();
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
    const readmeContent = await this.getCustomIconfont();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  handleSettingChange(e) {
    const { type } = e.currentTarget.dataset;
    const value = e.detail;
    this.setData({
      [`${type}`]: value,
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
