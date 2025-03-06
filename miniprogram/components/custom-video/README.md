# 介绍

封装微信小程序原生 video 标签，单例模式，解决视频播放黑屏，多视频播放混音，视频列表存在多个视频同时播放，自定义 UI 样式等等，目前支持属性配置，如需扩展其他原生功能可直接修改组件添加属性。

### Props

| 参数               | 说明                                                                                                   | 类型             | 默认值                          |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ---------------- | ------------------------------- |
| src                | 视频链接                                                                                               | string           | -                               |
| poster             | 视频封面图                                                                                             | string           | -                               |
| width              | 宽度，默认单位为`rpx`                                                                                  | string ｜ number | -                               |
| height             | 高度，默认单位为`rpx`                                                                                  | string ｜ number | -                               |
| autoplay           | 自动播放                                                                                               | boolean          | false                           |
| objectFit          | 当视频大小与 video 容器大小不一致时，视频的表现形式                                                    | string           | cover                           |
| loop               | 循环播放                                                                                               | boolean          | false                           |
| showPlay           | 展示播放 icon                                                                                          | boolean          | true                            |
| playIcon           | 播放 icon, 不传默认为本地播放 icon                                                                     | string           | /assets/images/play.png         |
| playIconSize       | 播放 icon 大小                                                                                         | string ｜ number | 120rpx                          |
| showFullScreen     | 展示全屏 icon                                                                                          | boolean          | true                            |
| fullScreenIcon     | 全屏 icon, 不传默认为本地全屏 icon                                                                     | string           | /assets/images/full-screen.png  |
| fullScreenIconSize | 播放 icon 大小                                                                                         | string ｜ number | 48rpx                           |
| showMuted          | 展示静音 icon                                                                                          | boolean          | true                            |
| mutedStatus        | 静音状态                                                                                               | boolean          | globalData.mutedStatus ｜ false |
| mutedIcon          | 静音 icon                                                                                              | string           | /assets/images/sound_off.png    |
| unMutedIcon        | 非静音 icon                                                                                            | string           | /assets/images/sound_on.png     |
| unWifiToast        | 非 wifi 情况下播放视频，第一次是否提示                                                                 | boolean          | true                            |
| unWifiToastMessage | 非 wifi 情况下播放视频，第一次提示的信息                                                               | string           | 非 Wi-Fi 网络，请注意流量消耗   |
| observePlayStatus  | 观察者播放状态, 开启后,wifi 情况下视频在触碰屏幕中线时会自动播放视频，离开可使用窗口高度将自动停止播放 | boolean          | true                            |
| observePauseStatus | 观察者暂停状态, 开启后视频在离开可使用窗口高度将自动停止播放                                           | boolean          | true                            |

### objectFit 视频表现形式 

| 合法值  | 说明 |
| ------- | ---- |
| contain | 包含 |
| fill    | 填充 |
| cover   | 覆盖 |

### Events

| 事件名                  | 说明                     | 回调参数     |
| ----------------------- | ------------------------ | ------------ |
| bind:handlePlay         | 点击播放时触发           | -            |
| bind:handlePause        | 点击暂停时触发           | -            |
| bind:handleMuted        | 点击静音时触发           | 当前静音状态 |
| bind:onFullscreenchange | 视频进入和退出全屏时触发 | 当前全屏状态 |
