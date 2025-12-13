const { handleError } = require('./utils')
const mallCategoriesCreate = require('./mall_categories_create')
const mallCategoriesDelete = require('./mall_categories_delete')
const mallCategoriesUpdate = require('./mall_categories_update')
const mallCategoriesGetAll = require('./mall_categories_get_all')
const mallProductsCreate = require('./mall_products_create')
const mallProductsDelete = require('./mall_products_delete')
const mallProductsUpdate = require('./mall_products_update')
const mallProductsGet = require('./mall_products_get')
const mallProductsGetAll = require('./mall_products_get_all')
const mallCartsCreate = require('./mall_carts_create')
const mallCartsDelete = require('./mall_carts_delete')
const mallCartsUpdate = require('./mall_carts_update')
const mallCartsGetAll = require('./mall_carts_get_all')
const mallBannersCreate = require('./mall_banners_create')
const mallBannersDelete = require('./mall_banners_delete')
const mallBannersUpdate = require('./mall_banners_update')
const mallBannersGetAll = require('./mall_banners_get_all')
const mallOrdersCreate = require('./mall_orders_create')
const mallOrdersUpdate = require('./mall_orders_update')
const mallOrdersGetAll = require('./mall_orders_get_all')
const mallOrdersGet = require('./mall_orders_get')
const mallOrdersConfirm = require('./mall_orders_confirm')
const mallOrdersCancel = require('./mall_orders_cancel')
const mallMiniProgramCodeGet = require('./mall_mini_program_code_get')

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    switch (event.type) {
      // 分类
      case 'mall_categories_create':
        return await mallCategoriesCreate.main(event, context)
      case 'mall_categories_delete':
        return await mallCategoriesDelete.main(event, context)
      case 'mall_categories_update':
        return await mallCategoriesUpdate.main(event, context)
      case 'mall_categories_get_all':
        return await mallCategoriesGetAll.main(event, context)
      // 商品
      case 'mall_products_create':
        return await mallProductsCreate.main(event, context)
      case 'mall_products_delete':
        return await mallProductsDelete.main(event, context)
      case 'mall_products_update':
        return await mallProductsUpdate.main(event, context)
      case 'mall_products_get':
        return await mallProductsGet.main(event, context)
      case 'mall_products_get_all':
        return await mallProductsGetAll.main(event, context)
      // 购物车
      case 'mall_carts_create':
        return await mallCartsCreate.main(event, context)
      case 'mall_carts_delete':
        return await mallCartsDelete.main(event, context)
      case 'mall_carts_update':
        return await mallCartsUpdate.main(event, context)
      case 'mall_carts_get_all':
        return await mallCartsGetAll.main(event, context)
      // 轮播图
      case 'mall_banners_create':
        return await mallBannersCreate.main(event, context)
      case 'mall_banners_delete':
        return await mallBannersDelete.main(event, context)
      case 'mall_banners_update':
        return await mallBannersUpdate.main(event, context)
      case 'mall_banners_get_all':
        return await mallBannersGetAll.main(event, context)
      // 订单
      case 'mall_orders_create':
        return await mallOrdersCreate.main(event, context)
      case 'mall_orders_update':
        return await mallOrdersUpdate.main(event, context)
      case 'mall_orders_get_all':
        return await mallOrdersGetAll.main(event, context)
      case 'mall_orders_get':
        return await mallOrdersGet.main(event, context)
      case 'mall_orders_confirm':
        return await mallOrdersConfirm.main(event, context)
      case 'mall_orders_cancel':
        return await mallOrdersCancel.main(event, context)
      // 小程序码
      case 'mall_mini_program_code_get':
        return await mallMiniProgramCodeGet.main(event, context)
      default:
        return {
          code: 404,
          message: `不支持的${event.type}操作`,
        }
    }
  } catch (error) {
    return handleError(error, `${event.type} 操作失败`)
  }
}