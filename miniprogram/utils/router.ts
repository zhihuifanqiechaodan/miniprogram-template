interface RouteConfig {
  text: string;
  pagePath: string;
  iconPath?: string;
  selectedIconPath?: string;
}
export const Home: RouteConfig = {
  text: '课程',
  pagePath: '/pages/home/index',
};

export const Review: RouteConfig = {
  text: '写评',
  pagePath: '/pages/review/index',
};

export const Profile: RouteConfig = {
  text: '我的',
  pagePath: '/pages/profile/index',
};
