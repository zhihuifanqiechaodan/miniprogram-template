import { giteeBaseUrl } from '~/config/index';
import { nativeGet } from '~/utils/request';

/**
 * @method getMiniprogramTemplate miniprogram-template说明文件
 * @param {*} data
 */
export const getMiniprogramTemplate = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/README.md`,
    data,
  });
};
/**
 * @method getCustomBrokenNetwork custom-broken-network说明文件
 * @param {*} data
 */
export const getCustomBrokenNetwork = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-broken-network/README.md`,
    data,
  });
};
/**
 * @method getCustomIconfont custom-iconfont说明文件
 * @param {*} data
 */
export const getCustomIconfont = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-iconfont/README.md`,
    data,
  });
};
/**
 * @method getCustomImage custom-image说明文件
 * @param {*} data
 */
export const getCustomImage = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-image/README.md`,
    data,
  });
};
/**
 * @method getCustomNavBar custom-nav-bar说明文件
 * @param {*} data
 */
export const getCustomNavBar = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-nav-bar/README.md`,
    data,
  });
};
/**
 * @method getCustomVideo custom-video说明文件
 * @param {*} data
 */
export const getCustomVideo = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-video/README.md`,
    data,
  });
};
/**
 * @method getCustomRichText custom-rich-text说明文件
 * @param {*} data
 */
export const getCustomRichText = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-rich-text/README.md`,
    data,
  });
};
/**
 * @method getCustomVirtualiList custom-virtuali-list说明文件
 * @param {*} data
 */
export const getCustomVirtualiList = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-virtuali-list/README.md`,
    data,
  });
};
