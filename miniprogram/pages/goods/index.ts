// pages/goods/index.ts
export {};
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    goodsList: [
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
      {
        id: 1,
        name: '招牌鸡腿饭',
        desc: '热销推荐',
        status: 'online',
        statusText: '已上架',
        price: '28',
        stock: '∞',
        image:
          'https://oss.fabrique.cn/24e6c0b0-d407-4452-a18d-5e8484211136.jpg?x-oss-process=image/format,webp/resize,w_1125,m_lfit&_t=2.2.8.0',
      },
    ],
    tabs: ['全部', '热销推荐', '主食', '小吃', '饮品'],
    currentTab: 1,
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
  onReachBottom() {
    console.log(111);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  handleTabsItemClick(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      currentTab: e.detail.index,
    });
  },
  handleScrolltolower() {
    console.log(1111);
  },
});
