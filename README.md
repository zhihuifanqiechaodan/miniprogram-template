# 介绍

[miniprogram-template](https://github.com/zhihuifanqiechaodan/miniprogram-template.git)是一个快速开发小程序的解决方案，它基于 [vant-weapp](https://github.com/youzan/vant-weapp.git) 实现。它使用了小程序目前支持的最新配置和api，内置了 eslist + prettier 代码规范，husky + lint-staged Git 提交代码规范验证，提供了丰富的功能组件，它可以帮助你快速搭建企业级小程序产品原型，希望本项目都能帮助你敏捷开发企业需求。

> 建议
> 
> 本项目的定位是小程序开发模版，适合当基础模板来进行二次开发，公共组件指在各种类型的小程序中都会使用到，后续会持续迭代，欢迎提issues。


## 功能

```js
- 默认tabBar中有4个，且放置在主包中
 
- 多环境发布
    - dev test pre prod
    
- 组件
    - 断网
    - iconfot字体图标
    - 图片
    - 导航
    
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
你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vant-weapp](https://github.com/youzan/vant-weapp.git)和[dayjs](https://github.com/iamkun/dayjs.git)，提前了解和学习这些知识会对使用本项目有很大的帮助。

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
│   ├── goods
│   ├── home
│   ├── message
│   └── user
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
> 强烈建议使用yarn安装依赖，避免使用npm或者cnpm安装，可能会有各种诡异的 bug。

完成上述安装 构建 编译后即可看到小程序内容，当你看到下面的页面说明你操作成功了。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80255efb11ef48958ccbbef223e5ac4b~tplv-k3u1fbpfcp-watermark.image?)

接下来你可以修改代码进行业务开发了，本项目内建了常用公共组件、全局路由管理等等各种实用的功能来辅助开发，你可以通过查看已有的工具类和封装方法来使用。

> 建议
> 
> 使用前建议将目前项目中已有的配置和文件夹工具类先行查看一番，方便后续使用，其次小程序路由和跳转都进行了封装，方便统一管理，后续需要自行维护。

## 其它
基于[miniprogram-template](https://github.com/zhihuifanqiechaodan/miniprogram-template.git)模版开发上线的小程序已有多个，可参考 Fabrique精品店 / 番茄博客园等。

对于一些小程序开发中常遇到的问题和解决方案欢迎讨论。

欢迎您提供宝贵的意见和建议，也欢迎提issues增加和修改功能或组件，另外如果可以的话请给个start，感谢～


## 更新日志

- v1.0.1 (20221020)
  1. 新增 custom-image 公共组件，属性同 [van-image](https://vant-contrib.gitee.io/vant-weapp/#/image)，图片裁剪模式同原生小程序 [image](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) 组件的 mode 属性。
  2. 新增 custom-iconfont 公共组件，支持设置大小，颜色，图标（需要提前引入使用的 iconfont），支持接收外部样式。
