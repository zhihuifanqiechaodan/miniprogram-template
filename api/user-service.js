import { baseUrl } from '~/config/index';
import { post } from '~/utils/request';

/**
 * @method addUserLoginWechatRegister 注册
 * @param {*} data
 */
export const addUserLoginWechatRegister = (data) => post({ url: `${baseUrl}//user/login/wechat_register`, data });
