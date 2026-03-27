import { IApiGetStatsOverviewRes } from '@/typings/api-types';
import { baseUrl } from '@miniprogram/config/index';
import { get } from '@miniprogram/utils/request';

/**
 * @method getStatsOverview 获取首页概览统计
 * @returns {Promise<IApiGetStatsOverviewRes>} 首页概览统计响应
 */
export const getStatsOverview = (): Promise<IApiGetStatsOverviewRes> => {
  return get<IApiGetStatsOverviewRes>({
    url: `${baseUrl}/stats/overview`,
  });
};
