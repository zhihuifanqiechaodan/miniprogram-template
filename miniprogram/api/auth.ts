import { IApiPostAuthLoginReq, IApiPostAuthLoginRes } from '@/typings/api-types';
import { baseUrl } from '@miniprogram/config/index';
import { post } from '@miniprogram/utils/request';

/**
 * @method postAuthLogin 登录
 * @param data 登录请求参数
 * @returns {Promise<IApiPostAuthLoginRes>} 登录响应
 */
export const postAuthLogin = (data: IApiPostAuthLoginReq): Promise<IApiPostAuthLoginRes> => {
  return post<IApiPostAuthLoginRes>({
    url: `${baseUrl}/auth/login`,
    data,
  });
};
