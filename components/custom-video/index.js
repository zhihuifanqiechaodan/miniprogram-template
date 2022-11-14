// components/custom-video/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 视频地址
    src: {
      type: String,
      value: '',
    },
    // 封面图
    poster: {
      type: String,
      value: '',
    },
    // 宽度
    width: {
      optionalTypes: [String, Number],
      value: '100vw',
    },
    // 高度
    height: {
      optionalTypes: [String, Number],
      value: '100vw',
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: false,
    },
    // 当视频大小与 video 容器大小不一致时，视频的表现形式
    objectFit: {
      type: String,
      value: 'cover',
    },
    // 是否展示全全屏icon
    showFullScreen: {
      type: Boolean,
      value: true,
    },
    // 是否展示静音icon
    showMuteBtn: {
      type: Boolean,
      value: true,
    },
    // 是否循环播放
    loop: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    init_load: false, // 初始化视频加载
    show_placeholder: true, // 是否展示封面图片站位
    show_video: false, // 是否展示视频标签
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
