# miniprogram-template

> 一个神奇的原生小程序开发模版

## 功能介绍

- 支持小程序发布后自动更新
- 【支持】eslist + prettier 代码规范
- 【支持】husky + lint-staged Git 提交代码规范验证
- 【支持】sass 语法 [ less 语法需更改配置 ]
- 【支持】app.js 初始化获取已包含 networkType、isConnected、systemInfo，具体使用和详情自行查看
- 【支持】npm 脚本设置环境变量，读取多种环境信息，基于 miniprogram-ci 实现自动化上传代码
- 【封装】工具类在 utils 文件夹中，建议开发前期先过一遍现有 api -【封装】公共组件在 components 文件夹中，建议开发前期先过一遍现有组件
- 【封装】配置文件在 config 文件夹中，建议开发前期先过一遍如何书写配置
- 【封装】路由表包含所有页面涉及交互跳转统一读取路由表路径，需个人维护
- 【封装】数据请求在 api 文件夹中，建议开发前期先过一遍如何书写维护 api

## 更新日志

- v1.0.1 (20221020)
  1. 新增 custom-image 公共组件，属性同 [van-image](https://vant-contrib.gitee.io/vant-weapp/#/image)，图片裁剪模式同原生小程序 [image](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) 组件的 mode 属性。
  2. 新增 custom-iconfont 公共组件，支持设置大小，颜色，图标（需要提前引入使用的 iconfont），支持接收外部样式。
