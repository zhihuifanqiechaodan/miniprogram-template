// components/com-nav-bar/index.ts
import { Home } from '@miniprogram/utils/router';
import { navigateTo, tabbarRoutes } from '@miniprogram/utils/util';
const app: IAppOption = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fixed: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: '',
    },
    backTop: {
      type: Boolean,
      value: true,
    },
    placeholder: {
      type: Boolean,
      value: false,
    },
    customStyle: {
      type: String,
      value: 'background: rgba(255, 255, 255, 0)',
    },
    showHome: {
      type: Boolean,
      value: false,
    },
    showBack: {
      type: Boolean,
      value: false,
    },
    showClose: {
      type: Boolean,
      value: false,
    },
    showSlot: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeAreaInsetTop: false,
    systemInfo: app.globalData.systemInfo,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method handleBackTop 回到顶部
     */
    handleBackTop() {
      const { backTop } = this.data;
      if (backTop) {
        wx.pageScrollTo({
          scrollTop: 0,
        });
        this.triggerEvent('handleBackTop');
      }
    },

    /**
     * @method handleNavigateBack 返回上一页
     */
    handleNavigateBack() {
      navigateTo({ type: 'navigateBack' });
      this.triggerEvent('handleNavigateBack');
    },

    /**
     * @method handleReLaunchHome 返回首页, 通常配置为tabbar的第一个页面
     */
    handleReLaunchHome() {
      navigateTo({ type: 'reLaunch', url: Home.pagePath });
      this.triggerEvent('handleReLaunchHome');
    },
  },
  lifetimes: {
    attached() {
      const pages = getCurrentPages();
      if (pages.length === 1) {
        const route = pages[0].route;
        if (!tabbarRoutes.map((item) => item.pagePath).includes('/' + route)) {
          this.setData({
            showHome: true,
            showBack: false,
          });
        }
      }
    },
  },
});
