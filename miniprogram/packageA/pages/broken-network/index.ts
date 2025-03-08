// packageA/pages/broken-network/index.js
import { getCustomBrokenNetwork } from '~/api/gitee';
import { BrokenNetwork } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork, shareImageFormat } from '~/utils/util';
import { shareImage } from '~/config/index';

interface IPageData {
  brokenNetwork: boolean;
  title: string;
  verticalCenter: boolean;
  message: string;
  buttonText: string;
  readmeContent: string | null;
}

Page({
  data: <IPageData>{
    brokenNetwork: false,
    title: BrokenNetwork.name,
    verticalCenter: false,
    message: '似乎已断开与互联网的连接',
    buttonText: '刷新',
    readmeContent: null,
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const imageUrl = shareImageFormat(shareImage);
    return {
      title: 'BrokenNetwork组件，网络请求失败的处理方案',
      imageUrl,
    };
  },
  getCustomBrokenNetwork(): Promise<string> {
    return new Promise((resolve) => {
      getCustomBrokenNetwork()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          this.setData(
            {
              brokenNetwork: true,
            },
            () => {
              Loading.clear();
            }
          );
          console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
        });
    });
  },

  async initData() {
    Loading.show();
    const readmeContent = await this.getCustomBrokenNetwork();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  handleSettingChange(e: WechatMiniprogram.TouchEvent) {
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

    this.initData();

    this.setData({
      brokenNetwork: false,
    });
  },
});
