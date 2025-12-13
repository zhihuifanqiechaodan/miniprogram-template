import { navigateTo } from '@miniprogram/utils/util';
import { GoodsDetail } from '@miniprogram/utils/router';
import { mallCartsCreate } from '@miniprogram/api/shopping-cart';

// components/custom-goods/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataInfo: {
      type: Object,
    },
    width: {
      type: String,
      optionalTypes: [String, Number],
      value: '320rpx',
    },
    height: {
      type: String,
      optionalTypes: [String, Number],
      value: '320rpx',
    },
    layout: {
      type: String,
      value: 'vertical', // horizontal or vertical
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
    handleGoodsClick() {
      return;
      const { dataInfo } = this.data;
      navigateTo({
        url: `${GoodsDetail.pagePath}?id=${dataInfo._id}`,
      });
    },
    handleAddCart() {
      wx.showLoading({
        title: '加载中...',
      });
      mallCartsCreate({
        product_id: this.data.dataInfo._id,
        quantity: 1,
        sku_id: this.data.dataInfo.skus[0].sku_id,
      }).then(() => {
        wx.hideLoading();
        wx.showToast({
          title: '添加成功',
        });
      });
    },
  },
});
