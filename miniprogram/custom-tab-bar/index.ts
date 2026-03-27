import { navigateTo, tabbarRoutes } from '@miniprogram/utils/util';

Component({
  data: {
    selected: 0,
    list: tabbarRoutes,
  },
  methods: {
    switchTab(e: WechatMiniprogram.TouchEvent) {
      const { pagePath, index } = e.currentTarget.dataset;
      navigateTo({ type: 'switchTab', url: pagePath });
      this.setData({
        selected: index,
      });
    },
  },
});
