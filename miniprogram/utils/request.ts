import { ApiResponse } from '@/typings/api-types';
import { getCurrentPageInfo } from '@miniprogram/utils/util';

export enum FunctionsType {
  mall_categories_create = 'mall_categories_create',
  mall_categories_delete = 'mall_categories_delete',
  mall_categories_update = 'mall_categories_update',
  mall_categories_get_all = 'mall_categories_get_all',
  mall_products_create = 'mall_products_create',
  mall_products_delete = 'mall_products_delete',
  mall_products_update = 'mall_products_update',
  mall_products_get = 'mall_products_get',
  mall_products_get_all = 'mall_products_get_all',
  mall_carts_create = 'mall_carts_create',
  mall_carts_delete = 'mall_carts_delete',
  mall_carts_update = 'mall_carts_update',
  mall_carts_get_all = 'mall_carts_get_all',
  mall_banners_create = 'mall_banners_create',
  mall_banners_delete = 'mall_banners_delete',
  mall_banners_update = 'mall_banners_update',
  mall_banners_get_all = 'mall_banners_get_all',
  mall_orders_create = 'mall_orders_create',
  mall_orders_get_all = 'mall_orders_get_all',
  mall_orders_get = 'mall_orders_get',
  mall_orders_confirm = 'mall_orders_confirm',
  mall_orders_cancel = 'mall_orders_cancel',
}

export const requestA = <T>({ type, params }: { type: FunctionsType; params: any }): Promise<T> => {
  const currentPage = getCurrentPageInfo();
  return new Promise((resolve, reject) => {
    wx.cloud
      .callFunction({
        name: 'mallFunctions',
        data: {
          type,
          params,
        },
      })
      .then((res) => {
        const result = res.result as ApiResponse<T>;
        if (result.code !== 200) {
          wx.hideLoading();
          wx.showToast({
            title: result.message,
            icon: 'none',
          });
          currentPage?.setData({
            brokenNetwork: false,
          });
          reject(result.message);
        }
        resolve(res.result as T);
      })
      .catch((err) => {
        wx.hideLoading();
        wx.showToast({
          title: '云函数请求失败',
          icon: 'none',
        });
        currentPage?.setData({
          brokenNetwork: false,
        });
        reject(err);
      });
  });
};
