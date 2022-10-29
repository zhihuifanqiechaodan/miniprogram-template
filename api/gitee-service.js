import { giteeBaseUrl } from '~/config/index';
import { nativeGet } from '~/utils/request';
/**
 * @method addContentDetail custom-broken-network说明文件
 * @param {*} data
 */
export const getMiniprogramTemplateContentsComponentsCustomBrokenNetwork = (data) => {
  return nativeGet({
    url: `${giteeBaseUrl}/zhihuifanqiechaodan/miniprogram-template/raw/master/components/custom-broken-network/README.md`,
    data,
  });
};
