// pages/course-detail/index.ts
export {};
import { defaultCourseId, findCourseById } from '../../data/course';
import { navigateTo } from '@miniprogram/utils/util';
import type { CourseItem } from '../../data/course';
const app: IAppOption = getApp();

Page({
  data: {
    systemInfo: app.globalData.systemInfo,
    courseId: 0,
    course: null as CourseItem | null,
  },

  /**
   * 生命周期函数--监听页面加载
   * @param {{ id?: string }} options 页面参数
   * @returns {void} 无返回值
   */
  onLoad(options: { id?: string }) {
    const parsedCourseId = Number.parseInt(options.id || '', 10);
    const courseId = Number.isNaN(parsedCourseId) ? defaultCourseId : parsedCourseId;

    this.setData({ courseId });
    this.loadCourseDetail(courseId);
  },

  /**
   * 加载课程详情数据
   * @param {number} id 课程 id
   * @returns {void} 无返回值
   */
  loadCourseDetail(id: number) {
    this.setData({
      course: findCourseById(id),
    });
  },

  /**
   * 返回上一页
   * @returns {void} 无返回值
   */
  handleNavigateBack() {
    navigateTo({ type: 'navigateBack' });
  },

  /**
   * 触发写评价提示
   * @returns {void} 无返回值
   */
  handleWriteReview() {
    wx.showToast({
      title: '写评价',
      icon: 'none',
    });
  },
});
