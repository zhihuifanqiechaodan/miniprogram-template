// components/custom-dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗状态
    show: {
      type: Boolean,
      value: false,
    },
    // 标题
    title: {
      type: String,
    },
    // 内容
    message: {
      type: String,
    },
    // 取消按钮的文案
    cancelButtonText: {
      type: String,
      value: '取消',
    },
    // 确认按钮的文案
    confirmButtonText: {
      type: String,
      value: '确认',
    },
    // 确认按钮展示状态
    showConfirmButton: {
      type: Boolean,
      value: true,
    },
    // 取消按钮展示状态
    showCancelButton: {
      type: Boolean,
      value: false,
    },
    // 确认按钮类型，微信开放能力，具体支持可参考 微信官方文档
    confirmButtonOpenType: {
      type: String,
      value: '',
    },
    // 取消按钮类型，微信开放能力，具体支持可参考 微信官方文档
    cancelButtonOpenType: {
      type: String,
      value: '',
    },
    // 自定义样式
    customStyle: {
      type: String,
      value: '',
    },
    overlayClose: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * @method callback 回调函数
     */
    callback: Function,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method onCancel 取消
     */
    onCancel() {
      this.handleAction('cancel');
    },
    /**
     * @method onConfirm 确认
     */
    onConfirm() {
      this.handleAction('confirm');
    },
    /**
     * @method handleAction 触发回调
     * @param {string} action
     */
    handleAction(action: string) {
      const { callback } = this.data;
      this.setData({
        show: false,
      });
      wx.nextTick(() => {
        callback?.(action);
      });
    },
    /**
     * @method onGetPhoneNumber 获取手机号码
     * @param {*} event
     */
    onGetPhoneNumber: function (event: WechatMiniprogram.TouchEvent) {
      this.triggerEvent('getphonenumber', event.detail);
    },

    handleOverlayClick() {
      const { overlayClose } = this.data;
      if (overlayClose) {
        this.setData({
          show: false,
        });
        this.triggerEvent('handleOverlayClick');
      }
    },

    handleEmployeeAgreeClick() {
      this.triggerEvent('handleEmployeeAgreeClick');
    },
  },
});
