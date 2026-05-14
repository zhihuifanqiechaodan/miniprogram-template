// pages/course-detail/index.ts
export {};
import dayjs from 'dayjs';
import { getCourses, getCoursesHotReviews } from '@miniprogram/api/courses';
import { navigateTo } from '@miniprogram/utils/util';
import type { IApiGetCoursesHotReviewsRes, IApiGetCoursesRes } from '@/typings/api-types';

const app: IAppOption = getApp();

/**
 * 评分展示项
 */
interface CourseRatingDisplayItem {
  key: string; // 字段键名
  label: string; // 展示标题
  percent: number; // 进度条宽度百分比
  tone: 'danger' | 'primary' | 'success' | 'warning'; // 评分条样式
  displayValue: string; // 展示评分文案
}

/**
 * 标签展示项
 */
interface CourseTagDisplayItem {
  text: string; // 标签文案
  tone: 'neutral' | 'danger' | 'success'; // 标签样式
}

/**
 * 点评展示项
 */
interface CourseReviewDisplayItem {
  id: string; // 点评 ID（ULID）
  userNickname: string; // 用户昵称
  userInitial: string; // 用户昵称首字母
  createdAtText: string; // 创建时间文案
  content: string; // 点评内容
}

Page({
  data: {
    systemInfo: app.globalData.systemInfo, // 设备信息
    courseId: '', // 当前课程 ID
    course: null as IApiGetCoursesRes | null, // 课程详情
    ratingDisplayList: [] as CourseRatingDisplayItem[], // 评分展示列表
    displayTagList: [] as CourseTagDisplayItem[], // 标签展示列表
    hotReviewList: [] as CourseReviewDisplayItem[], // 热门点评列表
  },

  /**
   * 生命周期函数--监听页面加载
   * @param {{ id?: string }} options 页面参数
   * @returns {void} 无返回值
   */
  onLoad(options: { id?: string }) {
    const courseId = options.id || '';

    this.setData({ courseId });
    this.initData(courseId);
  },

  /**
   * @method initData 初始化页面数据
   * @param {string} courseId 课程 ID
   * @returns {Promise<void>} 无返回值
   */
  async initData(courseId: string) {
    if (!courseId) {
      this.setData({
        course: null,
        ratingDisplayList: [],
        displayTagList: [],
        hotReviewList: [],
      });
      return;
    }

    const [getCoursesRes] = await Promise.all([getCourses({ id: courseId })]);
    const setData = {};

    const course = getCoursesRes;
    const schoolId = course.schoolIds[0];
    const [getCoursesHotReviewsRes] = await Promise.all([
      schoolId
        ? getCoursesHotReviews({
            limit: 6,
            schoolId,
          })
        : Promise.resolve([] as IApiGetCoursesHotReviewsRes),
    ]);

    Object.assign(setData, {
      course,
      ratingDisplayList: this.buildRatingDisplayList(course),
      displayTagList: this.buildDisplayTagList(course),
      hotReviewList: this.buildHotReviewList(getCoursesHotReviewsRes, course.id),
    });

    this.setData(setData);
  },

  /**
   * @method buildRatingDisplayList 构建评分展示数据
   * @param {IApiGetCoursesRes} course 课程详情
   * @returns {CourseRatingDisplayItem[]} 评分展示列表
   */
  buildRatingDisplayList(course: IApiGetCoursesRes): CourseRatingDisplayItem[] {
    return [
      this.buildRatingDisplayItem('difficultyRating', '课程难度', course.difficultyRating, 'danger'),
      this.buildRatingDisplayItem('homeworkRating', '作业多少', course.homeworkRating, 'primary'),
      this.buildRatingDisplayItem('gradingRating', '给分好坏', course.gradingRating, 'success'),
      this.buildRatingDisplayItem('harvestRating', '收获大小', course.harvestRating, 'warning'),
    ];
  },

  /**
   * @method buildRatingDisplayItem 构建单个评分展示项
   * @param {string} key 字段键名
   * @param {string} label 展示标题
   * @param {number} value 原始评分
   * @param {'danger' | 'primary' | 'success' | 'warning'} tone 评分条样式
   * @returns {CourseRatingDisplayItem} 单个评分展示项
   */
  buildRatingDisplayItem(
    key: string,
    label: string,
    value: number,
    tone: 'danger' | 'primary' | 'success' | 'warning'
  ): CourseRatingDisplayItem {
    const safeValue = Number.isFinite(value) ? value : 0;

    return {
      key,
      label,
      percent: Math.max(0, Math.min(100, (safeValue / 5) * 100)),
      tone,
      displayValue: safeValue.toFixed(1),
    };
  },

  /**
   * @method buildDisplayTagList 构建标签展示数据
   * @param {IApiGetCoursesRes} course 课程详情
   * @returns {CourseTagDisplayItem[]} 标签展示列表
   */
  buildDisplayTagList(course: IApiGetCoursesRes): CourseTagDisplayItem[] {
    const displayTagList: CourseTagDisplayItem[] = [];

    if (course.difficultyRating >= 4) {
      displayTagList.push({ text: '硬核', tone: 'neutral' });
    }

    if (course.homeworkRating >= 3.5) {
      displayTagList.push({ text: '作业多', tone: 'danger' });
    }

    if (course.harvestRating >= 4) {
      displayTagList.push({ text: '干货满满', tone: 'success' });
    }

    if (displayTagList.length === 0) {
      displayTagList.push({ text: course.status || '课程进行中', tone: 'neutral' });
    }

    return displayTagList.slice(0, 3);
  },

  /**
   * @method buildHotReviewList 构建热门点评展示数据
   * @param {IApiGetCoursesHotReviewsRes} reviewList 点评列表
   * @param {string} courseId 当前课程 ID
   * @returns {CourseReviewDisplayItem[]} 热门点评展示列表
   */
  buildHotReviewList(reviewList: IApiGetCoursesHotReviewsRes, courseId: string): CourseReviewDisplayItem[] {
    return reviewList
      .filter((item) => item.courseId === courseId)
      .map((item) => ({
        id: item.id,
        userNickname: item.userNickname,
        userInitial: item.userNickname.slice(0, 1).toUpperCase(),
        createdAtText: dayjs(item.createdAt).format('YYYY-MM-DD'),
        content: item.content,
      }));
  },

  /**
   * @method handleNavigateBack 返回上一页
   * @returns {void} 无返回值
   */
  handleNavigateBack() {
    navigateTo({ type: 'navigateBack' });
  },

  /**
   * @method handleWriteReview 触发写评价提示
   * @returns {void} 无返回值
   */
  handleWriteReview() {
    wx.showToast({
      title: '写评价',
      icon: 'none',
    });
  },
});
