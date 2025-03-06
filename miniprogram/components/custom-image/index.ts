// components/custom-image/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      optionalTypes: [String, Number],
      value: '100%',
    },
    height: {
      type: String,
      optionalTypes: [String, Number],
      value: '100%',
    },
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
    lazyLoad: {
      type: Boolean,
      value: true,
    },
    round: {
      type: Boolean,
      value: false,
    },
    flex: {
      type: Boolean,
      value: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
    showError: {
      type: Boolean,
      value: true,
    },
    showLoading: {
      type: Boolean,
      value: true,
    },
    placeholder: {
      type: Boolean,
      value: true,
    },
    customStyle: {
      type: String,
      value: '',
    },
    radius: {
      type: Number,
      optionalTypes: [String, Number],
      value: 0,
    },
    showLoadingBackg: {
      type: String,
      value: '#edf0f0',
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
    /**
     * @method error 当错误发生时触发，event.detail = {errMsg}
     */
    error() {
      this.setData({
        loading: false,
        error: true,
      });
    },
    /**
     * @method load 当图片载入完毕时触发，event.detail = {height, width}
     */
    load() {
      this.setData({
        loading: false,
      });
    },
  },
});
