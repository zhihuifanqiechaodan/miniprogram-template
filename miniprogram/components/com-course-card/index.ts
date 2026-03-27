interface CourseCardPayload {
  id: number;
  code: string;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    course: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 触发课程卡片点击事件
     * @returns {void} 无返回值
     */
    handleTap() {
      const course = this.data.course as CourseCardPayload;

      this.triggerEvent('cardtap', {
        id: course.id,
        code: course.code,
      });
    },
  },
});
