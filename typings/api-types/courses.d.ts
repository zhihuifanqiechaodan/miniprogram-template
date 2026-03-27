/**
 * 热门课程请求参数
 */
export interface IApiGetCoursesHotReq {
  limit: number; // 返回课程数量
}

/**
 * 热门课程单项数据
 */
export interface IApiGetCoursesHotItem {
  id: string; // 课程 ID（ULID）
  code: string; // 课程编码
  name: string; // 课程名称
  schoolAbbr: string; // 院校简称
  schoolIds: string[]; // 院校 ID 列表
  courseRating: number; // 课程评分
  compositeScore: number; // 综合评分
  topTags: string[]; // 热门标签
  reviewCount: number; // 评价数量
  score: number; // 展示分数
}

/**
 * 热门课程响应数据
 */
export type IApiGetCoursesHotRes = IApiGetCoursesHotItem[];
