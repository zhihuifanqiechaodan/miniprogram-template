import Toast from '@vant/weapp/toast/toast';
import { Home, Goods, Orders, Settings, Stats } from '@miniprogram/utils/router';

export const tabbarRoutes = [Home, Goods, Orders, Stats, Settings];
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
 * @method navigateTo 封装navigateTo请求
 * @param {*} { url, events }
 */
export const navigateTo = ({ url, events = {} }: { url: string; events?: any }) => {
  return new Promise((resolve) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateTo({
        url,
        events,
        success: resolve,
        fail: () => {
          redirectTo({ url, events });
        },
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method redirectTo 封装redirectTo请求
 * @param {*} { url, events }
 */
export const redirectTo = ({ url, events = {} }: { url: string; events?: any }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.redirectTo({
        url,
        events,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method navigateBack 封装navigateBack请求
 * @param {*} delta
 */
export const navigateBack = (delta: number = 1) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateBack({
        delta,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method switchTab 封装switchTab请求
 * @param {*} { url }
 */
export const switchTab = ({ url }: { url: string }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.switchTab({
        url,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method reLaunch 封装reLaunch请求
 * @param {*} { url }
 */
export const reLaunch = ({ url }: { url: string }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.reLaunch({
        url,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
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
