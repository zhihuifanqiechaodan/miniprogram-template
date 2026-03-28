import { IApiGetAuthMeRes, IApiPostAuthLoginReq, IApiPostAuthLoginRes } from '@/typings/api-types';
import { baseUrl } from '@miniprogram/config/index';
import { get, post } from '@miniprogram/utils/request';

/**
 * @method getAuthMe 获取当前用户资料
 * @returns {Promise<IApiGetAuthMeRes>} 当前用户资料响应
 */
export const getAuthMe = (): Promise<IApiGetAuthMeRes> => {
  return get<IApiGetAuthMeRes>({
    url: `${baseUrl}/auth/me`,
  });
};

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
