// components/custom-image/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      observer: function () {
        this.setData({
          error: false,
          loading: true,
        });
      },
    },
    mode: {
      type: String,
      value: 'aspectFill',
    },
    webp: {
      type: Boolean,
      value: true,
    },
    width: null,
    height: null,
    radius: null,
    round: Boolean,
    lazyLoad: Boolean,
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showMenuByLongpress: Boolean,
    showError: {
      type: Boolean,
      value: true,
    },
    showLoading: {
      type: Boolean,
      value: true,
    },
  },

  observers: {
    src() {
      this.setData({
        error: false,
        loading: true,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    error: false,
    loading: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(e) {
      this.setData({
        loading: false,
      });
      this.triggerEvent('load', e);
    },
    onError(e) {
      this.setData({
        loading: false,
        error: true,
      });
      this.triggerEvent('error', e);
      console.error('========================👇 custom-image加载错误 👇========================\n\n', e, '\n\n');
    },
    onClick(e) {
      this.triggerEvent('click', e);
    },
  },
});
