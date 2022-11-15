// components/custom-video/index.js
import Toast from '@vant/weapp/toast/toast';
import { checkNetwork, getNetworkType } from '~/utils/util';
const { globalData } = getApp();

Component({
  options: {
    pureDataPattern: /^_/,
  },
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
    // 播放icon, 不传默认为本地播放icon
    playIcon: {
      type: String,
      value: '/assets/images/play.png',
    },
    // 播放icon大小
    playIconSize: {
      optionalTypes: [String, Number],
      value: '120rpx',
    },
    // 是否展示全屏icon
    showFullScreen: {
      type: Boolean,
      value: true,
    },
    // 全屏icon, 不传默认为本地全屏icon
    fullScreenIcon: {
      type: String,
      value: '/assets/images/full-screen.png',
    },
    // 全屏icon大小
    fullScreenIconSize: {
      optionalTypes: [String, Number],
      value: '48rpx',
    },
    // 是否展示静音icon
    showMuted: {
      type: Boolean,
      value: true,
    },
    // 静音状态
    mutedStatus: {
      type: Boolean,
      value: globalData.mutedStatus || false,
    },
    // 静音icon
    mutedIcon: {
      type: String,
      value: '/assets/images/sound_off.png',
    },
    // 非静音icon
    unMutedIcon: {
      type: String,
      value: '/assets/images/sound_on.png',
    },
    // 静音icon大小
    mutedIconSize: {
      optionalTypes: [String, Number],
      value: '48rpx',
    },
    // 非wifi情况下播放视频，第一次是否提示
    unWifiToast: {
      type: Boolean,
      value: true,
    },
    // 非wifi情况下播放视频，第一次提示的信息
    unWifiToastMessage: {
      type: String,
      value: '非Wi-Fi网络，请注意流量消耗',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _eventType: '', // 事件类型，autoplay、play、pause
    _is_first_play: true, // 标记，用于处理加载进度中自动播放场景
    init_load: false, // 初始化视频加载
    show_placeholder: true, // 是否展示封面图片站位
    show_video: false, // 是否展示视频标签
    show_play: true, // 是否展示播放icon
    buffered_status: false, // 视频缓冲状态, 未缓冲之前只展示播放按钮
    percentage: '0%', // 播放进度百分比
    object_fit: 'cover', // 当视频大小与 video 容器大小不一致时，视频的表现形式
    is_full_screen: false, // 全屏状态
    id: '', // 视频组件唯一id
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method onError 视频播放出错时触发
     */
    onError() {
      console.error('========================👇 视频播放出错时触发 👇========================\n\n', '\n\n');
    },
    /**
     * @method onLoadedmetadata 视频元数据加载完成时触发。event.detail = {width, height, duration}
     * @param {*} e
     */
    onLoadedmetadata() {
      // 经测试发现，当视频数据源大的时候，加载时机没有onProgress快，即使视频数据源小的时候也会出现没有onProgress快, 因此逻辑放到onProgress中去进行。
      // console.log(
      //   '========================👇 视频元数据加载完成时触发。event.detail = {width, height, duration}👇========================\n\n',
      //   '\n\n'
      // );
    },
    /**
     * @method onProgress 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比
     * @param {*} e
     */
    onProgress(e) {
      const { buffered } = e.detail;
      const { _eventType, _is_first_play } = this.data;
      if (buffered > 0) {
        // 由于加载进度不管当前video处于什么状态都会执行，因此要处理事件类型进行播放, 防止多次触发播放，通过_is_first_play标记进行判断
        if (['play', 'autoplay'].includes(_eventType) && _is_first_play) {
          this.setData(
            {
              buffered_status: true,
              init_load: false,
              show_placeholder: false,
            },
            () => {
              this._play();
            }
          );
          console.log(
            '========================👇 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比👇========================\n\n',
            buffered,
            '\n\n'
          );
        }
      }
    },
    /**
     * @method onTimeupdate 播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次
     * @param {*} e
     */
    onTimeupdate(e) {
      const { currentTime, duration } = e.detail;
      // 计算进度条展示百分比
      let percentage = (currentTime / duration) * 100 + '%';
      this.setData({
        percentage,
      });
    },
    /**
     * @method onEnded 当播放到末尾时触发 ended 事件
     */
    onEnded() {
      this.setData({
        show_play: true,
        show_placeholder: true,
        percentage: '0%',
      });
    },
    /**
     * @method handlePlay 点击播放
     */
    async handlePlay() {
      await checkNetwork();
      const { _is_first_play, id } = this.data;
      const { VideoContextComponent = null, mutedStatus = false } = globalData;
      // 播放之前先处理上一个视频的业务逻辑（非当前播放视频组件）
      if (VideoContextComponent) {
        if (VideoContextComponent.data.id !== id) {
          VideoContextComponent.initializationData();
          globalData.VideoContextComponent = this;
        }
      } else {
        globalData.VideoContextComponent = this;
      }
      if (_is_first_play) {
        this.setData({
          _eventType: 'play',
          init_load: true,
          show_video: true,
          show_play: false,
          mutedStatus,
        });
      } else {
        this.setData({
          _eventType: 'play',
          show_placeholder: false,
          show_play: false,
          mutedStatus,
        });
        this._play();
      }
    },
    /**
     * @method _play 播放视频
     */
    _play() {
      const { id } = this.data;
      this.setData({
        _is_first_play: false,
      });
      this.createSelectorQuery()
        .select(`#${id}`)
        .context(function (res) {
          // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
          const VideoContext = res.context;
          VideoContext.play();
        })
        .exec();
    },
    /**
     * @method onPlay 当开始/继续播放时触发play事件
     */
    async onPlay() {
      const { unWifiToast, unWifiToastMessage } = this.data;
      const { isAutoPlayVideo = false } = globalData;
      const networkType = await getNetworkType();
      // 非wifi情况下，且非自动播放状态，且可以弹toast
      if (networkType !== 'wifi' && !isAutoPlayVideo && unWifiToast) {
        globalData.isAutoPlayVideo = true;
        Toast(unWifiToastMessage);
      }
    },
    /**
     * @method handlePause 点击暂停
     */
    handlePause() {
      this.setData({
        show_play: true,
        _eventType: 'pause',
      });
      this._pause();
    },
    /**
     * @method _pause 暂停视频
     */
    _pause() {
      const { id } = this.data;
      this.createSelectorQuery()
        .select(`#${id}`)
        .context(function (res) {
          // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
          const VideoContext = res.context;
          VideoContext.pause();
        })
        .exec();
    },
    /**
     * @method onPause 当暂停播放时触发 pause 事件
     */
    onPause() {},
    /**
     * @method handleMuted 点击静音
     */
    handleMuted() {
      const { mutedStatus } = this.data;
      this.setData({
        mutedStatus: !mutedStatus,
      });
      globalData.mutedStatus = !mutedStatus;
    },
    /**
     * @method handleFullScreen 点击全屏
     */
    handleFullScreen() {
      this._fullScreen();
    },
    /**
     * @method _fullScreen 全屏视频
     */
    _fullScreen() {
      const { id } = this.data;
      this.createSelectorQuery()
        .select(`#${id}`)
        .context(function (res) {
          // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
          const VideoContext = res.context;
          VideoContext.requestFullScreen();
        })
        .exec();
    },
    /**
     * @method onFullscreenchange 视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction 有效值为 vertical 或 horizontal
     */
    onFullscreenchange(e) {
      const { objectFit } = this.data;
      const { fullScreen } = e.detail;
      if (fullScreen) {
        this.setData({
          is_full_screen: fullScreen,
          object_fit: 'contain',
        });
      } else {
        this.setData({
          is_full_screen: fullScreen,
          object_fit: objectFit,
        });
      }
    },
    /**
     * @method initializationData 初始化data数据
     */
    initializationData() {
      this.setData(
        {
          _eventType: '', // 事件类型，autoplay、play、pause
          _is_first_play: true, // 标记，用于处理加载进度中自动播放场景
          init_load: false, // 初始化视频加载
          show_placeholder: true, // 是否展示封面图片站位
          show_play: true, // 是否展示播放icon
          buffered_status: false, // 视频缓冲状态, 未缓冲之前只展示播放按钮
          percentage: '0%', // 播放进度百分比
          object_fit: 'cover', // 当视频大小与 video 容器大小不一致时，视频的表现形式
          is_full_screen: false, // 全屏状态
        },
        () => {
          this.setData({
            show_video: false, // 是否展示视频标签
          });
        }
      );
    },
  },
  lifetimes: {
    attached() {
      const { autoplay } = this.data;
      const id = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      if (autoplay) {
        this.setData({
          init_load: true,
          show_video: true,
          show_play: false,
          _eventType: 'autoplay',
          id,
        });
      } else {
        this.setData({
          id: `video_${id}`,
        });
      }
    },
  },
});