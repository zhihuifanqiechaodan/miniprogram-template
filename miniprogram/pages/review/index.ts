import { Home } from '@miniprogram/utils/router';
import { navigateTo } from '@miniprogram/utils/util';
import { getTags } from '@miniprogram/api/tags';
import { IApiGetTagsItem } from '@/typings/api-types';

// pages/review/index.ts
export {};

/**
 * 课程选项
 */
interface CourseItem {
  id: number;
  name: string;
  code: string;
}

/**
 * 评分键名
 */
type RatingKey = 'difficulty' | 'homework' | 'grading' | 'harvest';

/**
 * 评分项
 */
interface RatingItem {
  key: RatingKey;
  label: string;
  value: number;
}

const DEFAULT_COURSE_LIST: CourseItem[] = [
  { id: 1, name: 'Software Construction', code: 'COMP9021' },
  { id: 2, name: 'Database Systems', code: 'COMP9311' },
  { id: 3, name: 'Computer Networks', code: 'COMP3331' },
  { id: 4, name: 'Math 1A', code: 'MATH1131' },
];

const DEFAULT_RATING_LIST: RatingItem[] = [
  { key: 'difficulty', label: '课程难度', value: 3 },
  { key: 'homework', label: '作业多少', value: 4 },
  { key: 'grading', label: '给分好坏', value: 2 },
  { key: 'harvest', label: '收获大小', value: 5 },
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseList: DEFAULT_COURSE_LIST,
    courseCode: '',
    matchedCourse: null as CourseItem | null,
    starOptions: [1, 2, 3, 4, 5],
    ratingList: DEFAULT_RATING_LIST,
    tagList: [] as IApiGetTagsItem[],
    content: '',
    isAnonymous: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
  },

  /**
   * @method initData 初始化页面数据
   * @returns {Promise<void>} 无返回值
   */
  async initData() {
    const [getTagsRes] = await Promise.allSettled([getTags({ limit: 100 })]);
    const setData = {};

    if (getTagsRes.status === 'fulfilled') {
      const tagList = getTagsRes.value.items
        .filter((tagItem) => tagItem.deletedAt === null)
        .map((tagItem) => ({ ...tagItem, active: false }));

      Object.assign(setData, { tagList });
    }

    this.setData(setData);
  },

  /**
   * 更新课程代码并尝试匹配课程
   * @param {WechatMiniprogram.Input} e 输入事件
   * @returns {void} 无返回值
   */
  handleCourseCodeInput(e: WechatMiniprogram.Input) {
    const courseCode = e.detail.value.replace(/\s+/g, '').toUpperCase();
    const { courseList } = this.data;
    const matchedCourse = courseList.find((courseItem) => courseItem.code === courseCode) ?? null;

    this.setData({
      courseCode,
      matchedCourse,
    });
  },

  /**
   * 更新指定评分项
   * @param {WechatMiniprogram.BaseEvent} e 点击事件
   * @returns {void} 无返回值
   */
  handleRatingTap(e: WechatMiniprogram.BaseEvent) {
    const { ratingKey, starValue } = e.currentTarget.dataset as {
      ratingKey?: RatingKey;
      starValue?: number | string;
    };

    if (!ratingKey || !starValue) {
      return;
    }

    const nextRatingList = this.data.ratingList.map((ratingItem) => {
      return ratingItem.key === ratingKey
        ? {
            ...ratingItem,
            value: Number(starValue),
          }
        : ratingItem;
    });

    this.setData({
      ratingList: nextRatingList,
    });
  },

  /**
   * 切换课程标签选中状态
   * @param {WechatMiniprogram.BaseEvent} e 点击事件
   * @returns {void} 无返回值
   */
  handleTagTap(e: WechatMiniprogram.BaseEvent) {
    const { tagId } = e.currentTarget.dataset as {
      tagId?: string;
    };

    if (!tagId) {
      return;
    }

    const nextTagList = this.data.tagList.map((tagItem) => {
      return tagItem.id === tagId
        ? {
            ...tagItem,
            active: !tagItem.active,
          }
        : tagItem;
    });

    this.setData({
      tagList: nextTagList,
    });
  },

  /**
   * 提示自定义标签暂未开放
   * @returns {void} 无返回值
   */
  handleAddTag() {
    wx.showToast({
      title: '自定义标签即将上线',
      icon: 'none',
    });
  },

  /**
   * 更新评价内容
   * @param {WechatMiniprogram.Input} e 输入事件
   * @returns {void} 无返回值
   */
  handleContentChange(e: WechatMiniprogram.Input) {
    this.setData({
      content: e.detail.value,
    });
  },

  /**
   * 切换匿名发布状态
   * @returns {void} 无返回值
   */
  handleAnonymousToggle() {
    this.setData({
      isAnonymous: !this.data.isAnonymous,
    });
  },

  /**
   * 提交课程评价
   * @returns {void} 无返回值
   */
  handleSubmit() {
    const { courseCode, matchedCourse, ratingList, tagList, content, isAnonymous } = this.data;

    if (!courseCode.trim()) {
      wx.showToast({
        title: '请输入课程代码',
        icon: 'none',
      });
      return;
    }

    if (!content.trim()) {
      wx.showToast({
        title: '请输入评价内容',
        icon: 'none',
      });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    console.log('submit review payload', {
      courseCode,
      courseName: matchedCourse?.name ?? '',
      ratings: ratingList,
      tags: tagList.filter((tagItem) => tagItem.active).map((tagItem) => tagItem.name),
      content: content.trim(),
      isAnonymous,
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });

      setTimeout(() => {
        navigateTo({ type: 'switchTab', url: Home.pagePath });
      }, 300);
    }, 1000);
  },
});
