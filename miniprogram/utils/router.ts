interface RouteConfig {
  pagePath: string;
  iconPath?: string;
  selectedIconPath?: string;
  text: string;
  isSpecial?: boolean;
}
export const WebView: RouteConfig = {
  pagePath: '/packageA/pages/web-view/index',
  text: 'WebView',
};
export const Home: RouteConfig = {
  pagePath: '/pages/home/index',
  iconPath: '/assets/images/tabbar/shop.svg',
  selectedIconPath: '/assets/images/tabbar/shop_fill.svg',
  text: '首页',
};
export const Goods: RouteConfig = {
  pagePath: '/pages/goods/index',
  iconPath: '/assets/images/tabbar/rank.svg',
  selectedIconPath: '/assets/images/tabbar/rank_fill.svg',
  text: '菜品',
};
export const Orders: RouteConfig = {
  pagePath: '/pages/orders/index',
  iconPath: '/assets/images/tabbar/cart.svg',
  selectedIconPath: '/assets/images/tabbar/cart_fill.svg',
  text: '订单',
};
export const Stats: RouteConfig = {
  pagePath: '/pages/Stats/index',
  iconPath: '/assets/images/tabbar/profile.svg',
  selectedIconPath: '/assets/images/tabbar/profile_fill.svg',
  text: '数据',
};
export const Settings: RouteConfig = {
  pagePath: '/pages/settings/index',
  iconPath: '/assets/images/tabbar/profile.svg',
  selectedIconPath: '/assets/images/tabbar/profile_fill.svg',
  text: '设置',
};
