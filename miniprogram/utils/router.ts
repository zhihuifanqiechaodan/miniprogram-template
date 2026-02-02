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

export const CourseDetail: RouteConfig = {
  text: '课程详情',
  pagePath: '/packageA/course-detail/index',
};

/**
 * 构建带参数的 URL
 * @param route 路由配置对象
 * @param params URL 参数
 */
export const buildUrl = (route: RouteConfig, params?: Record<string, string | number>): string => {
  let url = route.pagePath;
  if (params) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    url += `?${queryString}`;
  }
  return url;
};
