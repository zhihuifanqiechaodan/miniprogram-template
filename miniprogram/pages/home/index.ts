// pages/home/index.ts
export {};
import { CourseDetail } from '@miniprogram/utils/router';
import { buildUrl, navigateTo } from '@miniprogram/utils/util';
import { getCoursesHot } from '@miniprogram/api/courses';
import { getStatsOverview } from '@miniprogram/api/stats';
import { IApiGetCoursesHotRes, IApiGetStatsOverviewRes } from '@/typings/api-types';
import Toast from '@miniprogram/miniprogram_npm/@vant/weapp/toast/toast';
const app: IAppOption = getApp();

/**
 * 首页统计卡片展示结构
 */
interface HeroStatItem {
  label: string;
  value: string;
  highlight: boolean;
}

const heroStatsConfig: Array<{
  key: keyof IApiGetStatsOverviewRes;
  label: string;
  highlight: boolean;
}> = [
  {
    key: 'courseCount',
    label: '已收录',
    highlight: false,
  },
  {
    key: 'reviewCount',
    label: '真实评价',
    highlight: true,
  },
  {
    key: 'registeredUserCount',
    label: '用户',
    highlight: false,
  },
];

/**
 * 格式化数量展示
 * @param {number} value 数量值
 * @returns {string} 格式化后的展示值
 */
function formatCount(value: number): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    return '--';
  }
  if (value >= 1000) {
    const kValue = value / 1000;
    const fixed = kValue >= 10 ? kValue.toFixed(0) : kValue.toFixed(1);
    const display = fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;
    return `${display}k`;
  }
  return `${value}`;
}

/**
 * 构建首页统计卡片数据
 * @param {IApiGetStatsOverviewRes | undefined} overviewStats 接口返回的概览统计（可选）
 * @returns {HeroStatItem[]} 首页统计卡片数据
 */
function buildHeroStats(overviewStats?: IApiGetStatsOverviewRes): HeroStatItem[] {
  return heroStatsConfig.map((item) => {
    const value = overviewStats ? formatCount(overviewStats[item.key]) : '--';
    return {
      label: item.label,
      value,
      highlight: item.highlight,
    };
  });
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    keyword: '',
    heroStats: buildHeroStats(),
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

  /**
   * @method initData 初始化页面数据
   * @returns {Promise<void>} 无返回值
   */
  async initData() {
    const [getCoursesHotRes, getStatsOverviewRes] = await Promise.allSettled([
      getCoursesHot({ limit: 10 }),
      getStatsOverview(),
    ]);
    const setData = {};

    if (getCoursesHotRes.status === 'fulfilled') {
      Object.assign(setData, { displayCourseList: getCoursesHotRes.value });
    }

    if (getStatsOverviewRes.status === 'fulfilled') {
      Object.assign(setData, { heroStats: buildHeroStats(getStatsOverviewRes.value) });
    }

    this.setData(setData);
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
  },

  /**
   * 根据输入关键字筛选课程
   * @returns {void} 无返回值
   */
  handleSearch() {
    Toast('功能开发中');
  },

  /**
   * 重置课程筛选状态
   * @returns {void} 无返回值
   */
  handleResetFilter() {
    this.setData({
      keyword: '',
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
