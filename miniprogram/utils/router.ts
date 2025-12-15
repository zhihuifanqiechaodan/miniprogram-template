interface RouteConfig {
  pagePath: string;
  iconPath?: string;
  selectedIconPath?: string;
  text: string;
  isSpecial?: boolean;
}
export const Home: RouteConfig = {
  pagePath: '/pages/home/index',
  iconPath: '/assets/images/tabbar/shop.svg',
  selectedIconPath: '/assets/images/tabbar/shop_fill.svg',
  text: '商城',
};
export const Categories: RouteConfig = {
  pagePath: '/pages/categories/index',
  iconPath: '/assets/images/tabbar/rank.svg',
  selectedIconPath: '/assets/images/tabbar/rank_fill.svg',
  text: '分类',
};
export const Device: RouteConfig = {
  pagePath: '/pages/device/index',
  iconPath: '/assets/images/tabbar/device.svg',
  selectedIconPath: '/assets/images/tabbar/device_fill.svg',
  text: '',
  isSpecial: true,
};
export const Carts: RouteConfig = {
  pagePath: '/pages/carts/index',
  iconPath: '/assets/images/tabbar/cart.svg',
  selectedIconPath: '/assets/images/tabbar/cart_fill.svg',
  text: '购物车',
};
export const Profile: RouteConfig = {
  pagePath: '/pages/profile/index',
  iconPath: '/assets/images/tabbar/profile.svg',
  selectedIconPath: '/assets/images/tabbar/profile_fill.svg',
  text: '我的',
};
export const GoodsDetail: RouteConfig = {
  pagePath: '/packageA/pages/goods-detail/index',
  text: '商品详情',
};
export const Address: RouteConfig = {
  pagePath: '/packageA/pages/address/index',
  text: '地址',
};
export const AddressEdit: RouteConfig = {
  pagePath: '/packageA/pages/address-edit/index',
  text: '地址编辑',
};
export const OrderConfirm: RouteConfig = {
  pagePath: '/packageA/pages/order-confirm/index',
  text: '订单确认',
};
export const OrderList: RouteConfig = {
  pagePath: '/packageA/pages/order-list/index',
  text: '订单列表',
};
export const OrderDetail: RouteConfig = {
  pagePath: '/packageA/pages/order-detail/index',
  text: '订单详情',
};
export const Search: RouteConfig = {
  pagePath: '/packageA/pages/search/index',
  text: '搜索',
};
export const SignIn: RouteConfig = {
  pagePath: '/packageA/pages/sign-in/index',
  text: '签到',
};
export const Guide: RouteConfig = {
  pagePath: '/pages/guide/index',
  text: '引导页',
};
export const WebView: RouteConfig = {
  pagePath: '/packageA/pages/web-view/index',
  text: 'WebView',
};
export const AdminBackend: RouteConfig = {
  pagePath: '/packageB/pages/admin-backend/index',
  text: '后台管理',
};
export const AdminBanner: RouteConfig = {
  pagePath: '/packageB/pages/admin-banner/index',
  text: '轮播图管理',
};
export const AdminCategory: RouteConfig = {
  pagePath: '/packageB/pages/admin-category/index',
  text: '分类管理',
};
export const AdminProduct: RouteConfig = {
  pagePath: '/packageB/pages/admin-product/index',
  text: '商品管理',
};
