import { IApiShopGoodsDetailInfoData } from '@/typings/api-types/shop';
import { addShoppingCartAdd } from '@miniprogram/api/shopping-cart';
import { OrderConfirm } from '@miniprogram/utils/router';
import { eventBus, navigateTo } from '@miniprogram/utils/util';
import Toast from '@vant/weapp/toast/toast';

const app: IAppOption = getApp();
enum CustomSizePopupType {
  Default = 0, // 默认展示两者
  AddCart = 1, // 加入购物车
  BuyNow = 2, // 立即购买
}
// components/custom-size-popup/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
    },
    type: {
      type: Number,
      value: CustomSizePopupType.Default,
    },
    dataInfo: {
      type: Object,
    },
    chooseSkuPrice: {
      type: String,
    },
    chooseSku: {
      type: String,
    },
    userInfo: {
      type: Object,
    },
  },
  observers: {
    show(show) {
      if (show) {
        const { chooseSku } = this.data;
        this.setData({
          specOptionSelectList: chooseSku.split(','),
        });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    specOptionSelectList: [] as string[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('onClose');
    },
    handleSpecOptionSelect(e: WechatMiniprogram.TouchEvent) {
      const { specIndex, specId, optionId } = e.currentTarget.dataset;
      let { specOptionSelectList } = this.data;
      specOptionSelectList = specOptionSelectList.slice(0, specIndex + 1);
      specOptionSelectList[specIndex] = `${specId}:${optionId}`;
      this.setData({
        specOptionSelectList,
      });
      const sku = (this.data.dataInfo as IApiShopGoodsDetailInfoData).skuList.find(
        (item) => item.propertyChildIds === `${this.data.specOptionSelectList.filter((item) => item).join()},`
      );
      if (sku) {
        this.triggerEvent('handleSpecOptionSelect', { propertyChildIds: sku.propertyChildIds });
      }
    },
    async handleAddCart() {
      const sku = (this.data.dataInfo as IApiShopGoodsDetailInfoData).skuList.find(
        (item) => item.propertyChildIds === `${this.data.specOptionSelectList.filter((item) => item).join()},`
      );
      if (sku) {
        const { code, msg } = await addShoppingCartAdd({
          token: app.globalData.token,
          goodsId: (this.data.dataInfo as IApiShopGoodsDetailInfoData).basicInfo.id,
          number: 1,
          sku: JSON.stringify(
            this.data.specOptionSelectList
              .filter((item) => item)
              .map((item) => {
                return { optionId: Number(item.split(':')[0]), optionValueId: Number(item.split(':')[1]) };
              })
          ),
        });
        if (code === 200) {
          Toast('加入购物车');
          this.onClose();
          eventBus.triggerEventListener('onShoppingCartInfoUpdate');
        } else {
          Toast(msg);
        }
      } else {
        Toast('请选择规格');
      }
    },
    async handleBuyNow() {
      const sku = (this.data.dataInfo as IApiShopGoodsDetailInfoData).skuList.find(
        (item) => item.propertyChildIds === `${this.data.specOptionSelectList.filter((item) => item).join()},`
      );
      if (sku) {
        navigateTo({
          url: `${OrderConfirm.pagePath}?submitSource=1&id=${(this.data.dataInfo as IApiShopGoodsDetailInfoData).basicInfo.id}&sku=${encodeURIComponent(sku.propertyChildIds)}&skuStr=${encodeURIComponent(sku.propertyChildNames)}`,
        });
        this.onClose();
      } else {
        Toast('请选择规格');
      }
    },
    handleSizeClick() {
      const { type } = this.data;
      if (type === CustomSizePopupType.AddCart) {
        this.handleAddCart();
      } else if (type === CustomSizePopupType.BuyNow) {
        this.handleBuyNow();
      }
    },
  },
});
