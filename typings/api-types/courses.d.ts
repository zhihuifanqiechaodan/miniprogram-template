/**
 * 课程数据
 */
export interface IApiCourse {
  id: string; // 课程 ID（ULID）
  name: string; // 课程名称
  code: string; // 课程编码
  credits: number; // 课程学分
  status: string; // 课程状态
  statusAcademicYear: string; // 状态对应学年
  statusTermId: string; // 状态对应学期 ID（ULID）
  statusTermName: string; // 状态对应学期名称
  description: string; // 课程描述
  rating: number | null; // 课程综合评分
  difficultyRating: number; // 难度评分
  homeworkRating: number; // 作业评分
  gradingRating: number; // 给分评分
  harvestRating: number; // 收获评分
  likeCount: number; // 点赞数量
  favoriteCount: number; // 收藏数量
  reviewCount: number; // 评价数量
  schoolIds: string[]; // 院校 ID 列表
  instructorIds: string[]; // 教师 ID 列表
  assistantIds: string[]; // 助教 ID 列表
  tagIds: string[]; // 标签 ID 列表
  prerequisiteCourseIds: string[]; // 先修课程 ID 列表
  deletedAt: string | null; // 删除时间（ISO）
  createdAt: string; // 创建时间（ISO）
  updatedAt: string; // 更新时间（ISO）
}

/**
 * 获取课程列表响应数据
 */
export type IApiGetCoursesRes = IApiCourse;

/**
 * 获取课程详情请求参数
 */
export interface IApiGetCoursesReq {
  id: string; // 课程 ID（ULID）
}

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

/**
 * 热门点评请求参数
 */
export interface IApiGetCoursesHotReviewsReq {
  limit: number; // 返回点评数量
  schoolId: string; // 院校 ID（ULID）
}

/**
 * 热门点评单项数据
 */
export interface IApiGetCoursesHotReviewsItem {
  id: string; // 点评 ID（ULID）
  courseId: string; // 课程 ID（ULID）
  courseCode: string; // 课程编码
  courseName: string; // 课程名称
  content: string; // 点评内容
  academicYear: string; // 学年
  termId: string; // 学期 ID（ULID）
  termName: string; // 学期名称
  compositeScore: number; // 综合评分
  likeCount: number; // 点赞数量
  replyCount: number; // 回复数量
  userNickname: string; // 用户昵称
  userAvatarUrl: string; // 用户头像 URL
  createdAt: string; // 创建时间（ISO）
}

/**
 * 热门点评响应数据
 */
export type IApiGetCoursesHotReviewsRes = IApiGetCoursesHotReviewsItem[];
