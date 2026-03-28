// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types/index.d.ts" />

import type { IApiPostAuthLoginRes, IApiUser } from './api-types';

declare global {
  interface IAppOption {
    globalData: {
      systemInfo:
        | (WechatMiniprogram.SystemSetting &
            WechatMiniprogram.AppAuthorizeSetting &
            WechatMiniprogram.DeviceInfo &
            WechatMiniprogram.WindowInfo &
            WechatMiniprogram.AppBaseInfo)
        | null;
      networkType: string;
      isConnected: boolean;
      loadingRequestCount: number;
      loginInfo: IApiPostAuthLoginRes | null; // 登录信息
      userInfo: IApiUser | null; // 当前用户资料
    };
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  }
}
