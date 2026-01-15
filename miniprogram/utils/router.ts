interface RouteConfig {
  text: string;
  pagePath: string;
  iconPath?: string;
  selectedIconPath?: string;
}
export const Home: RouteConfig = {
  text: '首页',
  pagePath: '/pages/home/index',
};

export const Profile: RouteConfig = {
  text: '我的',
  pagePath: '/pages/profile/index',
};
