// pages/home/index.ts
export {};
import { CourseDetail, buildUrl } from '@miniprogram/utils/router';
import { navigateTo } from '@miniprogram/utils/util';
const app: IAppOption = getApp();

interface CourseItem {
  id: number;
  index: string;
  code: string;
  name: string;
  rating: string;
  bgColor: string;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    courseList: [
      { id: 1, index: '9021', code: 'COMP9021', name: 'Principles of Programming', rating: '4.8', bgColor: '#E3F2FD' },
      { id: 2, index: '9024', code: 'COMP9024', name: 'Data Structures and', rating: '4.6', bgColor: '#FCE4EC' },
      { id: 3, index: '9331', code: 'COMP9331', name: 'Computer Networks', rating: '4.5', bgColor: '#FFF3E0' },
      { id: 4, index: '9311', code: 'COMP9311', name: 'Database Systems', rating: '4.7', bgColor: '#F3E5F5' },
      { id: 5, index: '9315', code: 'COMP9315', name: 'Database Systems', rating: '4.4', bgColor: '#E8F5E9' },
    ] as CourseItem[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
   * 课程卡片点击事件
   */
  handleCourseTap(e: WechatMiniprogram.CustomEvent<{ id: number }>) {
    const { id } = e.currentTarget.dataset;
    const url = buildUrl(CourseDetail, { id });
    navigateTo({ url });
  },
});
