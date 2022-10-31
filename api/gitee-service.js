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
