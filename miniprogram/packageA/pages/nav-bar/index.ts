// packageA/pages/nav-bar/index.js
import { getCustomNavBar } from '~/api/gitee-service';
import { NavBar } from '~/utils/router';
import { Loading } from '~/components/custom-loading/loading';
import { checkNetwork, shareImageFormat } from '~/utils/util';
import { shareImage } from '~/config/index';

interface IPageData {
  brokenNetwork: boolean;
  title: string;
  readmeContent: string | null;
  backTop: boolean;
  border: boolean;
  showHome: boolean;
  showBack: boolean;
  showClose: boolean;
  safeAreaInsetTop: boolean;
  customStyle: string;
}
Page({
  /**
   * 页面的初始数据
   */
  data: <IPageData>{
    brokenNetwork: false,
    title: NavBar.name,
    readmeContent: null,
    backTop: true,
    border: false,
    showHome: false,
    showBack: false,
    showClose: false,
    safeAreaInsetTop: false,
    customStyle: 'background-color: #ffffff;',
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
      title: 'NavBar组件，自定义导航栏为页面提供导航功能',
      imageUrl,
    };
  },
  getCustomNavBar(): Promise<string> {
    return new Promise((resolve) => {
      getCustomNavBar()
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
    const readmeContent = await this.getCustomNavBar();
    this.setData(
      {
        readmeContent,
      },
      () => {
        Loading.clear();
      }
    );
  },
  handleSettingChange(e: WechatMiniprogram.CustomEvent) {
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
