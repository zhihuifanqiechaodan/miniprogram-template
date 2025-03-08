import { giteeBaseUrl } from '~/config/index';
import { nativeGet } from '~/utils/request';

interface GiteeRequestParams {
  branch?: string;
  ref?: string;
}

/**
 * @method getMiniprogramTemplate miniprogram-template说明文件
 */
export const getMiniprogramTemplate = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/README.md`,
    data,
  });
};

/**
 * @method getCustomBrokenNetwork custom-broken-network说明文件
 */
export const getCustomBrokenNetwork = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-broken-network/README.md`,
    data,
  });
};
/**
 * @method getCustomIconfont custom-iconfont说明文件
 */
export const getCustomIconfont = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-iconfont/README.md`,
    data,
  });
};

/**
 * @method getCustomImage custom-image说明文件
 */
export const getCustomImage = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-image/README.md`,
    data,
  });
};

/**
 * @method getCustomNavBar custom-nav-bar说明文件
 */
export const getCustomNavBar = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-nav-bar/README.md`,
    data,
  });
};

/**
 * @method getCustomVideo custom-video说明文件
 */
export const getCustomVideo = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-video/README.md`,
    data,
  });
};

/**
 * @method getCustomRichText custom-rich-text说明文件
 */
export const getCustomRichText = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-rich-text/README.md`,
    data,
  });
};
/**
 * @method getCustomVirtualiList custom-virtuali-list说明文件
 */
export const getCustomVirtualiList = (data?: GiteeRequestParams): Promise<string> => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-virtuali-list/README.md`,
    data,
  });
};
