import { navigateBack } from '@miniprogram/utils/util';

// pages/review/index.ts
export {};
const app: IAppOption = getApp();

interface CourseItem {
  id: number;
  name: string;
  code: string;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: app.globalData.systemInfo,
    // 课程列表（模拟数据，实际应从接口获取）
    courseList: [
      { id: 1, name: 'WEB前端开发', code: 'WEB001' },
      { id: 2, name: 'Python数据分析', code: 'PY001' },
      { id: 3, name: 'Java高级开发', code: 'JAVA001' },
      { id: 4, name: '人工智能基础', code: 'AI001' },
    ] as CourseItem[],
    // 选中的课程
    selectedCourse: null as CourseItem | null,
    // 评价内容
    content: '',
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
   * 课程选择变化
   */
  onCourseChange(e: WechatMiniprogram.CustomEvent) {
    const index = e.detail.value;
    const { courseList } = this.data;
    this.setData({
      selectedCourse: courseList[index],
    });
  },

  /**
   * 评价内容变化
   */
  onContentChange(e: WechatMiniprogram.CustomEvent) {
    this.setData({
      content: e.detail.value,
    });
  },

  /**
   * 提交评价
   */
  handleSubmit() {
    const { selectedCourse, content } = this.data;

    // 验证
    if (!selectedCourse) {
      wx.showToast({
        title: '请选择课程',
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

    // TODO: 调用接口提交评价
    wx.showLoading({ title: '提交中...' });

    // 模拟提交
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });

      // 返回上一页
      setTimeout(() => {
        navigateBack();
      }, 1500);
    }, 1000);
  },
});
