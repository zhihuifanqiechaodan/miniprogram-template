import Toast from '@vant/weapp/toast/toast';
import { version } from '@miniprogram/config/index';

/**
 * 请求参数
 */
interface RequestParams {
  method?: 'GET' | 'POST' | 'DELETE';
  url: string;
  data?: any;
  header?: Record<string, any>;
}

/**
 * 接口响应结构
 */
interface RequestResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * 通用请求方法
 * @param {RequestParams} params 请求参数
 * @returns {Promise<T>} 业务响应数据
 */
const _request = async <T>({ method, url, data, header }: RequestParams): Promise<T> => {
  const app = getApp<IAppOption>();

  return new Promise((resolve, reject) => {
    if (app.globalData.isConnected) {
      wx.request({
        url,
        data,
        method,
        header: {
          version,
          ...header,
        },
        success: (value) => {
          const { data: responseData, statusCode } = value;

          if (statusCode !== 200) {
            Toast(`服务请求错误，状态码：${statusCode}`);
            reject(`服务请求错误，状态码：${statusCode}`);
            return;
          }

          const response = responseData as RequestResponse<T>;

          if (response.code === 0 || response.code === 200) {
            resolve(response.data);
            return;
          }

          const errorMessage = response.msg || '服务请求失败';
          Toast(errorMessage);
          reject(errorMessage);
        },
        fail(reason) {
          Toast(reason.errMsg);
          reject(reason.errMsg);
        },
      });
    } else {
      Toast('似乎已经断开了与互联网的连接');
      reject('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * POST 请求
 * @param {Omit<RequestParams, 'method'>} params 请求参数
 * @returns {Promise<T>} 业务响应数据
 */
export const post = <T>({ url, data, header }: Omit<RequestParams, 'method'>): Promise<T> =>
  _request<T>({ method: 'POST', url, data, header });

/**
 * GET 请求
 * @param {Omit<RequestParams, 'method'>} params 请求参数
 * @returns {Promise<T>} 业务响应数据
 */
export const get = <T>({ url, data, header }: Omit<RequestParams, 'method'>): Promise<T> =>
  _request<T>({ method: 'GET', url, data, header });

/**
 * DELETE 请求
 * @param {Omit<RequestParams, 'method'>} params 请求参数
 * @returns {Promise<T>} 业务响应数据
 */
export const del = <T>({ url, data, header }: Omit<RequestParams, 'method'>): Promise<T> =>
  _request<T>({ method: 'DELETE', url, data, header });
