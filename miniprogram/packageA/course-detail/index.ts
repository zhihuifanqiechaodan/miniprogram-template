// pages/course-detail/index.ts
export {};
const app: IAppOption = getApp();

Page({
  data: {
    systemInfo: app.globalData.systemInfo,
    courseId: 0,
    course: null as Record<string, any> | null,
  },

  onLoad(options: { id: string }) {
    const courseId = parseInt(options.id) || 1;
    this.setData({ courseId });
    this.loadCourseDetail(courseId);
  },

  loadCourseDetail(id: number) {
    // 模拟课程详情数据
    const courseData: Record<string, any> = {
      1: {
        id: 1,
        index: '9021',
        code: 'COMP9021',
        name: 'Principles of Programming',
        rating: '4.8',
        bgColor: '#E3F2FD',
        description: '本课程介绍编程的基本原理，包括数据结构、算法和编程范式。',
      },
      2: {
        id: 2,
        index: '9024',
        code: 'COMP9024',
        name: 'Data Structures and',
        rating: '4.6',
        bgColor: '#FCE4EC',
        description: '本课程深入讲解数据结构和算法，帮助学生掌握编程核心技能。',
      },
      3: {
        id: 3,
        index: '9331',
        code: 'COMP9331',
        name: 'Computer Networks',
        rating: '4.5',
        bgColor: '#FFF3E0',
        description: '本课程涵盖计算机网络的基本原理和协议。',
      },
      4: {
        id: 4,
        index: '9311',
        code: 'COMP9311',
        name: 'Database Systems',
        rating: '4.7',
        bgColor: '#F3E5F5',
        description: '本课程介绍数据库系统的设计与实现。',
      },
      5: {
        id: 5,
        index: '9315',
        code: 'COMP9315',
        name: 'Database Systems',
        rating: '4.4',
        bgColor: '#E8F5E9',
        description: '本课程深入研究高级数据库技术。',
      },
    };
    this.setData({ course: courseData[id] || courseData[1] });
  },

  handleNavigateBack() {
    wx.navigateBack();
  },
});
