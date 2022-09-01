// components/custom-navbar/custom-navbar.js
import { navigateBack, reLaunch } from '~/utils/util';
import { Home, Goods, Message, User } from '~/utils/router';

Component({
  options: {},
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      value: true,
    },
    // 固定在顶部时是否开启占位
    placeholder: {
      type: Boolean,
      value: false,
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      value: false,
    },
    // 根节点自定义样式
    customStyle: {
      type: String,
      value: 'background: rgba(255, 255, 255, 0)',
    },
    // 是否显示左侧首页图标
    isHome: {
      type: Boolean,
      value: false,
    },
    //是否显示左侧返回图标
    isBack: {
      type: Boolean,
      value: false,
    },
    //是否显示左侧关闭图标
    isClose: {
      type: Boolean,
      value: false,
    },
    // 是否开启左侧插槽
    isSlot: {
      type: Boolean,
      value: false,
    },
    // 是否显示中间文案
    title: {
      type: String,
      value: '',
    },
    // 是否开启点击滚动到顶部
    backTop: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method handleBackTop 回到顶部
     */
    handleBackTop() {
      const { backTop } = this.data;
      // 将页面滚动到目标位置
      backTop &&
        wx.pageScrollTo({
          scrollTop: 0,
        });
    },

    /**
     * @method navigateBack 返回上一页
     */
    navigateBack() {
      navigateBack();
      this.triggerEvent('back');
    },

    /**
     * @method reLaunchHome 返回首页
     */
    reLaunchHome() {
      reLaunch({
        url: Home.path,
      });
    },
  },
  lifetimes: {
    attached() {
      // 过滤路由列表
      const tabbarRoute = [Home.path, Goods.path, Message.path, User.path];
      // 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
      const pages = getCurrentPages();
      // 如果当前页面栈只有一层
      if (pages.length === 1) {
        const route = pages[0].route;
        // 不是tabbar页面则显示返回首页
        if (!tabbarRoute.includes('/' + route)) {
          this.setData({
            isHome: true,
            isBack: false,
          });
        }
      }
    },
  },
});
