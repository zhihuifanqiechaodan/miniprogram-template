import { IApiGetCoursesHotReq, IApiGetCoursesHotRes } from '@/typings/api-types';
import { baseUrl } from '@miniprogram/config/index';
import { get } from '@miniprogram/utils/request';

/**
 * @method getCoursesHot 获取热门课程
 * @param data 热门课程请求参数
 * @returns {Promise<IApiGetCoursesHotRes>} 热门课程响应
 */
export const getCoursesHot = (data: IApiGetCoursesHotReq): Promise<IApiGetCoursesHotRes> => {
  return get<IApiGetCoursesHotRes>({
    url: `${baseUrl}/courses/hot`,
    data,
  });
};
