// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo | null;
    networkType: string;
    isConnected: boolean;
    mutedStatus: boolean;
    isAutoPlayVideo: boolean;
    videoContextComponent: WechatMiniprogram.Component.TrivialInstance | null;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  systemInfo: WechatMiniprogram.SystemSetting &
    WechatMiniprogram.AppAuthorizeSetting &
    WechatMiniprogram.DeviceInfo &
    WechatMiniprogram.WindowInfo &
    WechatMiniprogram.AppBaseInfo & {
      navbarHeight?: number
    }
}
