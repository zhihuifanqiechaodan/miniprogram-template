import { IApiGetTagsReq, IApiGetTagsRes } from '@/typings/api-types';
import { baseUrl } from '@miniprogram/config/index';
import { get } from '@miniprogram/utils/request';

/**
 * @method getTags 查询标签列表
 * @param data 查询标签列表请求参数
 * @returns {Promise<IApiGetTagsRes>} 查询标签列表响应
 */
export const getTags = (data: IApiGetTagsReq): Promise<IApiGetTagsRes> => {
  return get<IApiGetTagsRes>({
    url: `${baseUrl}/tags`,
    data,
  });
};
