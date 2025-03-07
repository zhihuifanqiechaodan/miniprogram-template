// components/custom-navbar/custom-navbar.js
import { navigateBack, reLaunch } from '~/utils/util';
import { Home } from '~/utils/router';
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
    zIndex: {
      type: Number,
      value: 100,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeAreaInsetTop: false,
    systemInfo: app.systemInfo,
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
      navigateBack();
      this.triggerEvent('handleNavigateBack');
    },

    /**
     * @method handleReLaunchHome 返回首页, 通常配置为tabbar的第一个页面
     */
    handleReLaunchHome() {
      reLaunch({ url: Home.path });
      this.triggerEvent('handleReLaunchHome');
    },
  },
  lifetimes: {
    attached() {
      // 过滤路由列表
      const tabbarRoute = [Home.path];
      // 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
      const pages = getCurrentPages();
      // 如果当前页面栈只有一层
      if (pages.length === 1) {
        const route = pages[0].route;
        // 不是tabbar页面则显示返回首页
        if (!tabbarRoute.includes('/' + route)) {
          this.setData({
            showHome: true,
            showBack: false,
          });
        }
      }
    },
  },
});
