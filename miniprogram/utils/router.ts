export interface RouteConfig {
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
export const Login: RouteConfig = {
  text: '登录',
  pagePath: '/pages/login/index',
};

export const CourseDetail: RouteConfig = {
  text: '课程详情',
  pagePath: '/packageA/course-detail/index',
};
