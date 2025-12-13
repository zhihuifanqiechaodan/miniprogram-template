// components/custom-video/index.js
import Toast from '@vant/weapp/toast/toast';
import { checkNetwork, getNetworkType } from '@miniprogram/utils/util';

const app: IAppOption = getApp();
const { globalData } = app;
export {};

interface IVideoObjectFit {
  objectFit: 'contain' | 'fill' | 'cover';
}
interface ICustomVideoData {
  _play_observe: WechatMiniprogram.IntersectionObserver | null;
  _pause_observe: WechatMiniprogram.IntersectionObserver | null;
  _event_type: '' | 'autoplay' | 'play' | 'pause';
  _is_first_play: boolean;
  init_load: boolean;
  show_placeholder: boolean;
  show_video: boolean;
  show_play: boolean;
  buffered_status: boolean;
  percentage: string;
  object_fit: IVideoObjectFit['objectFit'];
  is_full_screen: boolean;
  id: string;
  playbackRateIndex: number;
  playbackRateList: { label: string; value: number; src: string }[];
}

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
      type: String,
      optionalTypes: [String, Number],
      value: '100vw',
    },
    // 高度
    height: {
      type: String,
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
    // 是否循环播放
    loop: {
      type: Boolean,
      value: false,
    },
    // 是否展示播放icon
    showPlay: {
      type: Boolean,
      value: true,
    },
    // 播放icon, 不传默认为本地播放icon
    playIcon: {
      type: String,
      value: '/assets/images/play.png',
    },
    // 播放icon大小
    playIconSize: {
      type: String,
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
      type: String,
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
      type: String,
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
    // 观察者播放状态
    observePlayStatus: {
      type: Boolean,
      value: true,
    },
    // 观察者暂停状态
    observePauseStatus: {
      type: Boolean,
      value: true,
    },
    radius: {
      type: Number,
      optionalTypes: [String, Number],
      value: 0,
    },
  },

  observers: {
    src() {
      this.initializationData();
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _play_observe: null, // IntersectionObserver 对象
    _pause_observe: null, // IntersectionObserver 对象
    _event_type: '', // 事件类型，autoplay、play、pause
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
    playbackRateList: [
      { label: '1.0x', value: 1, src: '/assets/images/rate1.svg' },
      { label: '1.5x', value: 1.5, src: '/assets/images/rate1.5.svg' },
      // { label: '2.0x', value: 2 ,src: '/assets/images/rate2.svg'},
    ],
    playbackRateIndex: 0,
  } as ICustomVideoData,

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
        '========================👇 视频元数据加载完成时触发。event.detail = {width, height, duration}👇========================\n\n',
        '\n\n'
      );
    },
    /**
     * @method onProgress 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比
     * @param {*} e
     */
    onProgress(e: WechatMiniprogram.VideoPregress) {
      const { buffered } = e.detail;
      const { _event_type, _is_first_play } = this.data;
      if (buffered > 0) {
        // 由于加载进度不管当前video处于什么状态都会执行，因此要处理事件类型进行播放, 防止多次触发播放，通过_is_first_play标记进行判断
        if (['play', 'autoplay'].includes(_event_type) && _is_first_play) {
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
    onTimeupdate(e: WechatMiniprogram.VideoTimeUpdate) {
      const { currentTime, duration } = e.detail;
      // 计算进度条展示百分比
      const percentage = (currentTime / duration) * 100 + '%';
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
      this.triggerEvent('onEnded');
    },
    /**
     * @method handlePlay 点击播放
     */
    async handlePlay() {
      await checkNetwork();
      const { _is_first_play, id } = this.data;
      const { videoContextComponent } = globalData;
      // 播放之前先处理上一个视频的业务逻辑（非当前播放视频组件）
      if (videoContextComponent) {
        const videoData = videoContextComponent.data as ICustomVideoData;
        if (videoData.id !== id) {
          videoContextComponent.initializationData();
          globalData.videoContextComponent = this;
        }
      } else {
        globalData.videoContextComponent = this;
      }
      if (_is_first_play) {
        this.setData({
          _event_type: 'play',
          init_load: true,
          show_video: true,
          show_play: false,
        });
      } else {
        this.setData({
          _event_type: 'play',
          show_placeholder: false,
          show_play: false,
        });
        this._play();
      }
      this.triggerEvent('handlePlay');
    },
    /**
     * @method _play 播放视频
     */
    _play() {
      const { id, _is_first_play, mutedStatus } = this.data;
      if (_is_first_play) {
        this.setData({
          _is_first_play: false,
        });
      }
      this.setData({
        mutedStatus: mutedStatus || globalData.mutedStatus,
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
        init_load: false,
        show_play: true,
        _event_type: 'pause',
      });
      this._pause();
      this.triggerEvent('handlePause');
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
      this.triggerEvent('handleMuted', !mutedStatus);
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
    onFullscreenchange(e: WechatMiniprogram.VideoFullScreenChange) {
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
          object_fit: objectFit as IVideoObjectFit['objectFit'],
        });
      }
      this.triggerEvent('onFullscreenchange', fullScreen);
    },
    /**
     * @method initializationData 初始化data数据
     */
    initializationData() {
      this.setData(
        {
          _event_type: '', // 事件类型，autoplay、play、pause
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
    /**
     * @method observeCustomVideoPlay 监测视频自动播放
     */
    observeCustomVideoPlay() {
      const { screenHeight } = globalData.systemInfo!;
      const _play_observe = this.createIntersectionObserver({});
      _play_observe
        .relativeToViewport({
          top: -(screenHeight / 2 - 1),
          bottom: -(screenHeight / 2 - 1),
        })
        .observe('#custom-video', async (value) => {
          const networkType = await getNetworkType();
          const { is_full_screen, show_play } = this.data;
          const { intersectionRatio } = value;
          // 处于监测区域且非全屏暂停状态并且是wifi状态
          if (intersectionRatio && !is_full_screen && show_play && networkType === 'wifi') {
            this.handlePlay();
          }
        });
      this.setData({
        _play_observe,
      });
    },
    /**
     * @method observeCustomVideoPuase 监测视频自动停止
     */
    observeCustomVideoPuase() {
      const _pause_observe = this.createIntersectionObserver({});
      _pause_observe.relativeToViewport().observe('#custom-video', (value) => {
        const { intersectionRatio } = value;
        const { is_full_screen, show_play } = this.data;
        // 超出屏幕范围且非全屏且正在播放
        if (!intersectionRatio && !is_full_screen && !show_play) {
          this.handlePause();
        }
      });
      this.setData({
        _pause_observe,
      });
    },
    /**
     * @method handleChangePlaybackRate 切换视频播放速度
     * 每次点击切换到下一个倍率，末尾后回到第一个
     */
    handleChangePlaybackRate() {
      this.setData({
        playbackRateIndex: (this.data.playbackRateIndex + 1) % this.data.playbackRateList.length,
      });
      // 设置 video 组件的播放速度
      this.createSelectorQuery()
        .select(`#${this.data.id}`)
        .context((res) => {
          const VideoContext = res.context;
          if (VideoContext && VideoContext.playbackRate) {
            VideoContext.playbackRate(this.data.playbackRateList[this.data.playbackRateIndex].value);
          }
        })
        .exec();
    },
  },
  lifetimes: {
    attached() {
      const { autoplay, _play_observe, _pause_observe, observePlayStatus, observePauseStatus } = this.data;
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
          _event_type: 'autoplay',
          id: `video_${id}`,
        });
      } else {
        this.setData({
          id: `video_${id}`,
        });
      }
      _play_observe?.disconnect();
      _pause_observe?.disconnect();
      if (observePlayStatus) {
        this.observeCustomVideoPlay();
      }
      if (observePauseStatus) {
        this.observeCustomVideoPuase();
      }
    },
  },
  pageLifetimes: {
    show() {
      const { _play_observe, _pause_observe, observePlayStatus, observePauseStatus } = this.data;
      _play_observe?.disconnect();
      _pause_observe?.disconnect();
      if (observePlayStatus) {
        this.observeCustomVideoPlay();
      }
      if (observePauseStatus) {
        this.observeCustomVideoPuase();
      }
    },
    hide() {
      const { _play_observe, _pause_observe } = this.data;
      _play_observe?.disconnect();
      _pause_observe?.disconnect();
    },
  },
});
