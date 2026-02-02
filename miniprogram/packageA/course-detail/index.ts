// pages/course-detail/index.ts
export {};
const app: IAppOption = getApp();

interface CourseReview {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

interface CourseData {
  id: number;
  code: string;
  name: string;
  tags: string[];
  description: string;
  overallRating: number;
  workloadPercent: number;
  gradingPercent: number;
  reviews: CourseReview[];
}

Page({
  data: {
    systemInfo: app.globalData.systemInfo,
    courseId: 0,
    course: null as CourseData | null,
  },

  onLoad(options: { id: string }) {
    const courseId = parseInt(options.id) || 1;
    this.setData({ courseId });
    this.loadCourseDetail(courseId);
  },

  loadCourseDetail(id: number) {
    const courseData: Record<number, CourseData> = {
      1: {
        id: 1,
        code: 'FINC5001',
        name: 'Capital Markets and Corporate Finance',
        tags: ['挂科率高', '理论课'],
        description:
          '本课程介绍金融市场的基本概念和运作机制，包括股票、债券、衍生品等金融工具的学习。深入探讨公司金融的核心议题，如资本结构、融资决策、投资评估等。帮助学生建立系统的金融知识框架。',
        overallRating: 3.2,
        workloadPercent: 85,
        gradingPercent: 45,
        reviews: [
          {
            id: 1,
            author: 'Tom',
            avatar: 'T',
            date: '2024-11-15',
            content: '课程内容很有挑战性，但是老师讲得很清晰。作业量适中，期末考试难度较大。',
          },
          {
            id: 2,
            author: 'Jerry',
            avatar: 'J',
            date: '2024-11-10',
            content: '理论性较强，需要花时间理解。给分比较严格，建议提前预习。',
          },
        ],
      },
    };
    this.setData({ course: courseData[id] || courseData[1] });
  },

  handleNavigateBack() {
    wx.navigateBack();
  },

  handleWriteReview() {
    wx.showToast({
      title: '写评价',
      icon: 'none',
    });
  },
});
