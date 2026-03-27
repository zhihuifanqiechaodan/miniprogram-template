// pages/home/index.ts
export {};
import { CourseDetail } from '@miniprogram/utils/router';
import { courseCatalog, courseStats } from '@miniprogram/data/course';
import { buildUrl, navigateTo } from '@miniprogram/utils/util';
import { getCoursesHot } from '@miniprogram/api/courses';
import { IApiGetCoursesHotRes } from '@/typings/api-types';
const app: IAppOption = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    keyword: '',
    heroStats: courseStats,
    displayCourseList: [] as IApiGetCoursesHotRes,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  async initData() {
    Promise.all([getCoursesHot({ limit: 10 })]).then(([getCoursesHotRes]) => {
      this.setData({
        displayCourseList: getCoursesHotRes,
      });
    });
  },

  /**
   * 更新搜索关键字
   * @param {WechatMiniprogram.Input} e 输入事件
   * @returns {void} 无返回值
   */
  handleKeywordInput(e: WechatMiniprogram.Input) {
    const keyword = e.detail.value;

    this.setData({
      keyword,
    });

    if (!keyword.trim()) {
      this.setData({
        displayCourseList: courseCatalog,
      });
    }
  },

  /**
   * 根据输入关键字筛选课程
   * @returns {void} 无返回值
   */
  handleSearch() {
    const normalizedKeyword = this.data.keyword.trim().toUpperCase();

    if (!normalizedKeyword) {
      this.setData({
        displayCourseList: courseCatalog,
      });
      return;
    }

    const displayCourseList = courseCatalog.filter((course) => {
      return [course.code, course.school, course.name.toUpperCase()].some((field) =>
        field.toUpperCase().includes(normalizedKeyword)
      );
    });

    this.setData({
      displayCourseList,
    });
  },

  /**
   * 重置课程筛选状态
   * @returns {void} 无返回值
   */
  handleResetFilter() {
    this.setData({
      keyword: '',
      displayCourseList: courseCatalog,
    });
  },

  /**
   * 课程卡片点击事件
   * @param {WechatMiniprogram.CustomEvent<{ id: number }>} e 自定义点击事件
   * @returns {void} 无返回值
   */
  handleCourseTap(e: WechatMiniprogram.CustomEvent<{ id: number }>) {
    const { id } = e.detail;
    const url = buildUrl(CourseDetail, { id });
    navigateTo({ url });
  },
});
