import {
  IApiGetCoursesHotReq,
  IApiGetCoursesHotRes,
  IApiGetCoursesHotReviewsReq,
  IApiGetCoursesHotReviewsRes,
  IApiGetCoursesReq,
  IApiGetCoursesRes,
} from '@/typings/api-types';
import { baseUrl } from '@miniprogram/config/index';
import { get } from '@miniprogram/utils/request';

/**
 * @method getCourses 获取课程详情
 * @param data 课程详情请求参数
 * @returns {Promise<IApiGetCoursesRes>} 课程详情响应
 */
export const getCourses = (data: IApiGetCoursesReq): Promise<IApiGetCoursesRes> => {
  return get<IApiGetCoursesRes>({
    url: `${baseUrl}/courses/${data.id}`,
  });
};

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

/**
 * @method getCoursesHotReviews 查询课程热门点评
 * @param data 热门点评请求参数
 * @returns {Promise<IApiGetCoursesHotReviewsRes>} 热门点评响应
 */
export const getCoursesHotReviews = (data: IApiGetCoursesHotReviewsReq): Promise<IApiGetCoursesHotReviewsRes> => {
  return get<IApiGetCoursesHotReviewsRes>({
    url: `${baseUrl}/courses/hot-reviews?limit=${data.limit}&schoolId=${data.schoolId}`,
  });
};
