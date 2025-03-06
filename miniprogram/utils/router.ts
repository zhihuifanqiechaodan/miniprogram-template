interface RouteConfig {
  path: string;
  name: string;
}

export const Home: RouteConfig = {
  path: '/pages/home/index',
  name: '首页',
};
export const BrokenNetwork: RouteConfig = {
  path: '/packageA/pages/broken-network/index',
  name: 'BrokenNetwork 断网',
};
export const Iconfont: RouteConfig = {
  path: '/packageA/pages/iconfot/index',
  name: 'Iconfont 阿里图标',
};
export const Image: RouteConfig = {
  path: '/packageA/pages/image/index',
  name: 'Image 图片',
};
export const NavBar: RouteConfig = {
  path: '/packageA/pages/nav-bar/index',
  name: 'NavBar 导航栏',
};
export const RichText: RouteConfig = {
  path: '/packageA/pages/rich-text/index',
  name: 'RichText 富文本',
};
export const Readme: RouteConfig = {
  path: '/packageA/pages/readme/index',
  name: 'MiniProgram-Template 模版介绍',
};
export const Video: RouteConfig = {
  path: '/packageA/pages/video/index',
  name: 'Video 视频',
};
export const VirtualiList: RouteConfig = {
  path: '/packageA/pages/virtuali-list/index',
  name: 'VirtualiList 虚拟列表',
};
export const SwiperGuideAnimation: RouteConfig = {
  path: '/packageB/pages/swiper-guide-animation/index',
  name: '轮播图引导动画',
};
