import {
  IApiPointsMallGetDailyTaskCompletions,
  IApiPointsMallGetUserPoints,
  IApiPointsMallGetUserSignInHistory,
} from '@/typings/api-types/points-mall';
import {
  addPointsMallGetDailyTaskCompletions,
  addPointsMallGetUserPoints,
  addPointsMallGetUserSignInHistory,
} from '@miniprogram/api/points-mall';
import { Loading } from '@miniprogram/components/custom-loading/loading';
import Toast from '@miniprogram/miniprogram_npm/@vant/weapp/toast/toast';
import { PointsMall } from '@miniprogram/utils/router';
import { eventBus, navigateTo } from '@miniprogram/utils/util';
import dayjs from 'dayjs';

// packageA/pages/sign-in/index.ts
const app: IAppOption = getApp();

interface DayItem {
  date: number | null;
  fullDate: string | null;
  day: string;
  isToday: boolean;
  timestamp: number | null;
  isEmpty: boolean;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    brokenNetwork: false,
    calendar: [] as DayItem[][],
    currentMonth: '',
    historyInfo: null as IApiPointsMallGetUserSignInHistory | null,
    pointsInfo: null as IApiPointsMallGetUserPoints | null,
    dailyTaskCompletions: null as IApiPointsMallGetDailyTaskCompletions | null,
    chooseCalendarDay: dayjs().format('YYYY-MM-DD'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initCalendar();
    if (app.globalData.userInfo) {
      this.initData();
    }
    eventBus.addEventListener('onUserLogin', () => {
      this.initData();
    });
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
  onUnload() {
    eventBus.removeEventListener('onUserLogin');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  initCalendar() {
    const now = dayjs();
    const days = now.daysInMonth();
    const currentMonth = now.format('YYYY年MM月');

    // 获取当月第一天是星期几（0-6，0代表星期日）
    const firstDayOfMonth = now.startOf('month').day();

    // 生成单个日期项
    const generateDayItem = (date: dayjs.Dayjs | null): DayItem => {
      if (!date) {
        return {
          date: null,
          fullDate: null,
          day: '',
          isToday: false,
          timestamp: null,
          isEmpty: true,
        };
      }

      return {
        date: date.date(),
        fullDate: date.format('YYYY-MM-DD'),
        day: date.format('dd'),
        isToday: date.isSame(dayjs(), 'day'),
        timestamp: date.valueOf(),
        isEmpty: false,
      };
    };

    // 生成所有日期项（包括空白天）
    const allDays: DayItem[] = [];

    // 添加月初空白天
    for (let i = 0; i < firstDayOfMonth; i++) {
      allDays.push(generateDayItem(null));
    }

    // 添加当月所有天
    for (let i = 1; i <= days; i++) {
      const currentDate = now.date(i);
      allDays.push(generateDayItem(currentDate));
    }

    // 计算需要补充的空白天数，确保最后一行完整
    const totalDays = allDays.length;
    const remainingDays = 7 - (totalDays % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        allDays.push(generateDayItem(null));
      }
    }

    // 将一维数组转为二维数组，每7天一组
    const calendar: DayItem[][] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      calendar.push(allDays.slice(i, i + 7));
    }
    this.setData({
      calendar,
      currentMonth,
    });
  },
  initData() {
    Loading.show();
    Promise.all([
      addPointsMallGetUserSignInHistory({
        userId: app.globalData.userInfo!.base.id.toString(),
        startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
      }),
      addPointsMallGetUserPoints({ userId: app.globalData.userInfo!.base.id }),
      addPointsMallGetDailyTaskCompletions({
        userId: app.globalData.userInfo!.base.id.toString(),
        date: dayjs().format('YYYY-MM-DD'),
      }),
    ]).then(
      ([
        addPointsMallGetUserSignInHistoryRes,
        addPointsMallGetUserPointsRes,
        addPointsMallGetDailyTaskCompletionsRes,
      ]) => {
        Loading.clear();
        if (addPointsMallGetUserSignInHistoryRes.code !== 200) {
          Toast(addPointsMallGetUserSignInHistoryRes.message);
          return;
        }
        if (addPointsMallGetUserPointsRes.code !== 200) {
          Toast(addPointsMallGetUserPointsRes.msg);
          return;
        }
        if (addPointsMallGetDailyTaskCompletionsRes.code !== 200) {
          Toast(addPointsMallGetDailyTaskCompletionsRes.msg);
          return;
        }
        this.setData({
          historyInfo: addPointsMallGetUserSignInHistoryRes.data,
          pointsInfo: addPointsMallGetUserPointsRes.data,
          dailyTaskCompletions: addPointsMallGetDailyTaskCompletionsRes.data,
        });
      }
    );
  },
  handleExchange() {
    navigateTo({ url: PointsMall.pagePath });
  },
  handleChooseCalendarDay(e: WechatMiniprogram.TouchEvent) {
    Loading.show();
    addPointsMallGetDailyTaskCompletions({
      userId: app.globalData.userInfo!.base.id.toString(),
      date: e.currentTarget.dataset.fullDate,
    }).then((addPointsMallGetDailyTaskCompletionsRes) => {
      Loading.clear();
      if (addPointsMallGetDailyTaskCompletionsRes.code !== 200) {
        Toast(addPointsMallGetDailyTaskCompletionsRes.msg);
        return;
      }
      this.setData({
        dailyTaskCompletions: addPointsMallGetDailyTaskCompletionsRes.data,
        chooseCalendarDay: e.currentTarget.dataset.fullDate,
      });
    });
  },
});
