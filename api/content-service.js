import { baseUrl } from '~/config/index';
import { post } from '~/utils/request';

/**
 * @method addContentDetail 内容详情
 * @param {*} data
 */
export const addContentDetail = (data) => {
  return post({
    url: `${baseUrl}/content/detail`,
    data,
  });
};
