import { checkNetwork, getRect, getAllRect } from '@miniprogram/utils/util';

// components/custom-tabs/index.js
Component({
  externalClasses: ['external-custom-tabs-item', 'external-custom-tabs-item-active'],
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
    },
    currentTab: {
      type: Number,
      value: 0,
    },
    customStyle: {
      type: String,
    },
    tabsItemPlaceholderWidth: {
      type: String,
    },
  },

  observers: {
    tabs() {
      this.computedTabsScrollLeft();
    },
    currentTab() {
      this.computedTabsScrollLeft();
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollLeft: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    computedTabsScrollLeft() {
      Promise.all([getAllRect(this, '.custom-tabs-item'), getRect(this, '.custom-tabs-item-wrapper')]).then(
        (_a: any) => {
          const tabRects = _a[0],
            navRect = _a[1];
          const tabRect = tabRects[this.data.currentTab];
          const offsetLeft = tabRects.slice(0, this.data.currentTab).reduce(function (prev: any, curr: any) {
            return prev + curr.width;
          }, 0);
          this.setData({
            scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
          });
        }
      );
    },
    async handleTabsItemClick(e: WechatMiniprogram.TouchEvent) {
      await checkNetwork();
      if (e.currentTarget.dataset.index === this.data.currentTab) return;
      this.triggerEvent('handleTabsItemClick', { index: e.currentTarget.dataset.index });
      wx.nextTick(() => {
        this.computedTabsScrollLeft();
      });
    },
  },
});
