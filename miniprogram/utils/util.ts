import Toast from '@vant/weapp/toast/toast';
import { Home, Review, Profile, RouteConfig } from '@miniprogram/utils/router';

export const tabbarRoutes = [Home, Review, Profile];
export const setTabBarSelected = () => {
  const currentPageInfo = getCurrentPageInfo();
  if (typeof currentPageInfo?.getTabBar === 'function') {
    const selected = tabbarRoutes.findIndex((item) => {
      return item.pagePath === `/${currentPageInfo.route}`;
    });
    currentPageInfo?.getTabBar().setData({
      selected,
    });
  }
};

/**
 * @method buildUrl 构建带参数的页面 URL
 * @param {RouteConfig} route 路由配置对象
 * @param {Record<string, string | number>} params URL 参数
 * @returns {string} 拼接后的页面地址
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
/**
 * 页面跳转方法类型
 */
type NavigateMethod = 'navigateTo' | 'redirectTo' | 'navigateBack' | 'switchTab' | 'reLaunch';

/**
 * 通过 URL 跳转的页面参数
 */
interface NavigateByUrlOptions {
  type?: Exclude<NavigateMethod, 'navigateBack'>;
  url: string;
  events?: WechatMiniprogram.IAnyObject;
}

/**
 * 返回上一页的参数
 */
interface NavigateBackOptions {
  type: 'navigateBack';
  delta?: number;
}

/**
 * 页面跳转参数
 */
type NavigateOptions = NavigateByUrlOptions | NavigateBackOptions;

/**
 * @method navigateTo 封装页面跳转请求
 * @param {NavigateOptions} options 跳转参数
 * @returns {Promise<WechatMiniprogram.GeneralCallbackResult | void>} 跳转结果
 */
export const navigateTo = (options: NavigateOptions) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;

    if (!isConnected) {
      Toast('似乎已经断开了与互联网的连接');
      reject('似乎已经断开了与互联网的连接');
      return;
    }

    if (options.type === 'navigateBack') {
      wx.navigateBack({
        delta: options.delta ?? 1,
        success: resolve,
        fail: reject,
      });
      return;
    }

    const { url } = options;

    if (options.type === 'redirectTo') {
      wx.redirectTo({
        url,
        success: resolve,
        fail: reject,
      });
      return;
    }

    if (options.type === 'switchTab') {
      wx.switchTab({
        url,
        success: resolve,
        fail: reject,
      });
      return;
    }

    if (options.type === 'reLaunch') {
      wx.reLaunch({
        url,
        success: resolve,
        fail: reject,
      });
      return;
    }

    wx.navigateTo({
      url,
      events: options.events ?? {},
      success: resolve,
      fail: () => {
        navigateTo({
          type: 'redirectTo',
          url,
        })
          .then(resolve)
          .catch(reject);
      },
    });
  });
};

/**
 * @method getCurrentPageInfo 获取当前页面栈中指定路径的页面信息
 * @param {*} path app.json中定义的完整路径
 */
export const getCurrentPageInfo = (
  path?: string
): WechatMiniprogram.Page.Instance<AnyObject, AnyObject> | undefined => {
  // 存在指定路径， 返回指定路径页面详情
  if (path) {
    // 反转数组，返回最后一次出现路由
    return getCurrentPages()
      .reverse()
      .find((item) => {
        return `/${item.route}` === path;
      });

    // 反转数组,返回当前页面详情
  } else {
    return getCurrentPages().reverse()[0];
  }
};

/**
 * @method getCurrentPageIndex 获取当前页面栈中指定路径的下标
 * @param {*} path app.json中定义的完整路径
 */
export const getCurrentPageIndex = (path: string) => {
  return getCurrentPages()
    .reverse()
    .findIndex((item) => {
      return `/${item.route}` === path;
    });
};

/**
 * @method checkNetwork 检查网络
 */
export const checkNetwork = () => {
  return new Promise<void>((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    if (isConnected) {
      resolve();
    } else {
      Toast('似乎已经断开了与互联网的连接');
      reject('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method getNetworkType 获取网络类型
 */
export const getNetworkType = (): Promise<'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none'> => {
  return new Promise<'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none'>((resolve) => {
    // 获取网络类型
    wx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        resolve(networkType);
      },
    });
  });
};

/**
 * @method shareImageFormat 图片格式处理
 * @param {*} url
 * @returns
 */
export const shareImageFormat = (url: string) => {
  const { systemInfo } = getApp();
  const { system } = systemInfo;
  const systemDetail = system.split(' ');
  const type = systemDetail[0];
  const version = systemDetail[1];
  // ios系统14版本以下，小程序分享的图片不支持webp格式，进行转换
  if (type.toLowerCase() === 'ios' && parseInt(version) <= 14) {
    return url.replace('format,webp', 'format,jpg');
  } else {
    return url;
  }
};

export const getSystemInfoSync = () => {
  const systemSetting = wx.getSystemSetting();
  const appAuthorizeSetting = wx.getAppAuthorizeSetting();
  const deviceInfo = wx.getDeviceInfo();
  const windowInfo = wx.getWindowInfo();
  const appBaseInfo = wx.getAppBaseInfo();
  const menuButton = wx.getMenuButtonBoundingClientRect();
  return {
    ...systemSetting,
    ...appAuthorizeSetting,
    ...deviceInfo,
    ...windowInfo,
    ...appBaseInfo,
    menuButton,
  };
};

interface IEventBusClients {
  [key: string]: ((data: any) => void)[];
}
/**
 * eventBus 事件总线
 */
export const eventBus = {
  clients: {} as IEventBusClients,
  /**
   * @method addEventListener 事件监听
   * @param {'onUserLogin' | 'onShoppingCartInfoUpdate' | 'onAddressRemove' | 'onAddressSaved' | 'onAddressChoose' | 'onTaskCompleted' | 'onCreateTaskCompleted' | 'onSignInCompleted'} method 方法名
   * @param {Function} fn 回调函数
   */
  addEventListener(method: string, fn: (data: any) => void) {
    if (!this.clients[method]) {
      this.clients[method] = [];
    }
    this.clients[method].push(fn);
  },
  /**
   * @method triggerEventListener 事件触发
   * @param {'onUserLogin' | 'onShoppingCartInfoUpdate' | 'onAddressRemove' | 'onAddressSaved' | 'onAddressChoose' | 'onTaskCompleted' | 'onCreateTaskCompleted' | 'onSignInCompleted'} method 方法名
   * @param {object} data
   */
  triggerEventListener(method: string, data?: any) {
    this.clients[method]?.forEach((fn: (data: any) => void) => fn(data));
  },
  /**
   * @method removeEventListener 删除事件
   * @param {'onUserLogin' | 'onShoppingCartInfoUpdate' | 'onAddressRemove' | 'onAddressSaved' | 'onAddressChoose' | 'onTaskCompleted' | 'onCreateTaskCompleted' | 'onSignInCompleted'} method 方法名
   */
  removeEventListener(method: string) {
    this.clients[method]?.pop();
  },
};

export const getRect = (context: any, selector: string) => {
  return new Promise((resolve) => {
    context
      .createSelectorQuery()
      .select(selector)
      .boundingClientRect(function (rect: any) {
        resolve(rect);
      })
      .exec();
  });
};

export const getAllRect = (context: any, selector: string) => {
  return new Promise((resolve) => {
    context
      .createSelectorQuery()
      .selectAll(selector)
      .boundingClientRect(function (rects: any) {
        resolve(rects);
      })
      .exec();
  });
};
