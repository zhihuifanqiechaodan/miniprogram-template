// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types/index.d.ts" />

import './api-types';

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
      mutedStatus: boolean;
      isAutoPlayVideo: boolean;
      videoContextComponent: WechatMiniprogram.Component.TrivialInstance | null;
    };
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  }
}
