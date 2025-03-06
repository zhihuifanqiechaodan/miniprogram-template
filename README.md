# 介绍

[miniprogram-template](https://github.com/zhihuifanqiechaodan/miniprogram-template.git)是一个快速开发小程序的解决方案，它基于  [vant-weapp](https://github.com/youzan/vant-weapp.git)  实现。它使用了小程序目前支持的最新配置和 api，内置了 eslist + prettier 代码规范，husky + lint-staged Git 提交代码规范验证，提供了丰富的功能组件，它可以帮助你快速搭建企业级小程序产品原型，希望本项目都能帮助你敏捷开发企业需求。

> 建议
>
> 本项目的定位是小程序开发模版，适合当基础模板来进行二次开发，公共组件指在各种类型的小程序中都会使用到，后续会持续迭代，欢迎提 issues。

## 使用案例

| 官方示例                                                                                                                                        | Fabrique 精品店                                                                                                                                 | 番茄博客园                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ![gh_c23588506ec6_258.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db83dfa894b74afc92d25e7807477ff8~tplv-k3u1fbpfcp-watermark.image?) | ![gh_839b5f04980b_258.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c43daa6e274432bb7d0126a8aff9ee5~tplv-k3u1fbpfcp-watermark.image?) | ![gh_484cb9ae32b9_258.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cd2ecf572ff4344bb5de94f57462f10~tplv-k3u1fbpfcp-watermark.image?) |

## 预览

扫描下方小程序二维码，体验小程序模版示例：

![gh_c23588506ec6_258.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c98aaa2cb7ad44549a064f1db037b84b~tplv-k3u1fbpfcp-watermark.image?)

## 功能

```js
- tabBar放置在主包中, 其他页面放置到对应的分包中

- 多环境发布
    - dev test pre prod

- 组件
    - custom-broken-network
    - custom-iconfont
    - custom-image
    - custom-loading
    - custom-more
    - custom-nav-bar
    - custom-nomore
    - custom-rich-text
    - custom-video
    - custom-virtuali-list

- 全局配置
    - eslist + prettier 代码规范
    - husky + lint-staged git提交代码规范验证
    - 支持scss语法[ less 语法需更改配置 ]
    - 初始化获取已包含 networkType、isConnected、systemInfo
    - npm 脚本设置环境变量，读取多种环境信息，基于 miniprogram-ci 实现自动化上传代码
    - 工具类在 utils 文件夹中
    - 路由表包含所有页面涉及交互跳转统一读取路由表路径，需个人维护
    - 配置文件在 config 文件夹中
    - 数据请求在 api 文件夹中
    - 小程序发布后提示更新
```

## 前序准备

你需要在本地安装  [node](http://nodejs.org/)  和  [git](https://git-scm.com/)。本项目技术栈基于  [ES2015+](http://es6.ruanyifeng.com/)、[vant-weapp](https://github.com/youzan/vant-weapp.git)和[dayjs](https://github.com/iamkun/dayjs.git)，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖小程序开发的各类封装和规范，下面是整个项目的目录结构。

```js
├── README.md
├── api
│   ├── content-service.js
│   └── user-service.js
├── app.js
├── app.json
├── app.scss
├── assets
│   ├── images
│   └── styles
├── components
│   ├── custom-broken-network
│   ├── custom-iconfont
│   ├── custom-image
│   └── custom-nav-bar
├── config
│   ├── development.js
│   ├── env.js
│   ├── index.js
│   ├── local.js
│   ├── preview.js
│   ├── production.js
│   └── test.js
├── miniprogram-ci.js
├── miniprogram_npm
│   ├── @vant
│   └── dayjs
├── package.json
├── packageA
│   └── logs
├── pages
│   ├── home
├── private.wx2f3fed2106f72ceb.key
├── project.config.json
├── project.private.config.json
├── sitemap.json
├── switch-env.js
├── utils
│   ├── request.js
│   ├── router.js
│   ├── util.js
│   └── wxs.wxs
└── yarn.lock
```

## 安装

```js
# 克隆项目
git clone https://github.com/zhihuifanqiechaodan/miniprogram-template.git

# 进入项目目录
cd miniprogram-template

# 安装依赖
yarn install

# 小程序编辑器-工具-构建

# 编译刷新
```

> TIP
>
> 强烈建议使用 yarn 安装依赖，避免使用 npm 或者 cnpm 安装，可能会有各种诡异的 bug。

完成上述安装 构建 编译后即可看到小程序内容，当你看到下面的页面说明你操作成功了。

![2081667222419_.pic.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a55b8f2edbce4172a97b02e634822982~tplv-k3u1fbpfcp-watermark.image?)

接下来你可以修改代码进行业务开发了，本项目内建了常用公共组件、全局路由管理等等各种实用的功能来辅助开发，你可以通过查看已有的工具类和封装方法来使用。

> 建议
>
> 使用前建议将目前项目中已有的配置和文件夹工具类先行查看一番，方便后续使用，其次小程序路由和跳转都进行了封装，方便统一管理，后续需要自行维护。

## 公共组件

关于公共组件的介绍和使用请查看对应组件文件夹下的 README.md, 也可以查看公共组件介绍页面的 demo.

## 其它

基于[miniprogram-template](https://github.com/zhihuifanqiechaodan/miniprogram-template.git)模版开发上线的小程序已有多个，可参考 Fabrique 精品店 / 番茄博客园等。

对于一些小程序开发中常遇到的问题和解决方案欢迎讨论。

欢迎您提供宝贵的意见和建议，也欢迎提 issues 增加和修改功能或组件，另外如果可以的话请给个 start，感谢～

**个人微信**

![WechatIMG18.jpeg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1767488f0d6e43ff9a26ec2d6b6e65f0~tplv-k3u1fbpfcp-watermark.image?)

## 更新日志

- v1.0.5(20230320)

  1. 新增 轮播图引导动画 业务组件，基于 css animation 实现， 常用于引导告知用户当前是一个轮播图，可以左右滑动查看图片等等

- v1.0.4(20221118)

  1. 新增 custom-virtuali-list 公共组件，基于 IntersectionObserver 结合抽象节点实现，通过虚拟化列表，超大数据渲染将不再是一个头疼的问题。
  2. custom-video 公共组件新增 observeOpen 属性，观察者开启状态, 开启后视频在触碰屏幕中线时会自动播放视频，离开可使用窗口高度将自动停止播放。

- v1.0.3(20221116)

  1.  新增 custom-video 公共组件， 封装微信小程序原生 video 标签，单例模式，解决视频播放黑屏，多视频播放混音，视频列表存在多个视频同时播放，自定义 UI 样式等等，目前支持属性配置，如需扩展其他原生功能可直接修改组件添加属性。
  2.  components 文件夹下的公共组件统一增加 README.md 说明文件。
  3.  新增 custom-video 演示页面。
  4.  custom-image 公共组件优化。

- v1.0.2(20221028)

  1.  新增 custom-rich-text 公共组件，基于 [mp-html](https://github.com/jin-yufeng/mp-html.git)封装，目前支持识别富文本以及 markdown 格式内容如需其他插件功能，可查看 [mp-html](https://github.com/jin-yufeng/mp-html.git) 文档，通过配置打包后将生成的 mp-weixin 文件夹放置到 components 文件件中覆盖原有的 mp-weixin 文件夹

- v1.0.1 (20221020)
  1. 新增 custom-image 公共组件，属性同 [van-image](https://vant-contrib.gitee.io/vant-weapp/#/image)，图片裁剪模式同原生小程序 [image](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) 组件的 mode 属性。
  2. 新增 custom-iconfont 公共组件，支持设置大小，颜色，图标（需要在/assets/styles/iconfont.scss 文件中提前引入使用的 iconfont），支持接收组件外部样式 external-iconfont。
