# 小程序项目交付文档

## 一、项目概述

### 1.1 项目名称

眼健康视力小程序

### 1.2 项目简介

本项目是一款专注于眼健康管理的小程序，提供视力检测、近视防控训练、健康数据分析等功能，帮助用户关注和改善眼部健康。

### 1.3 项目目标

- 提供便捷的视力检测工具
- 提供科学的近视防控训练方案
- 记录和分析用户视力健康数据
- 提供眼健康知识科普

## 二、技术栈

### 2.1 前端技术

- 微信小程序原生开发
- TypeScript
- SCSS
- Vant Weapp UI组件库
- Day.js 日期处理

### 2.2 后端技术

- RESTful API
- 身份认证与授权
- 数据存储与分析

### 2.3 开发工具

- 微信开发者工具
- VS Code
- Git
- Prettier 代码格式化
- ESLint 代码检查

## 三、项目结构

```
weiai-eyesight-weapp/
├── .cursor/                # Cursor IDE配置
├── .github/                # GitHub相关配置
├── .husky/                 # Git钩子配置
├── docs/                   # 文档目录
├── miniprogram/            # 小程序源代码
│   ├── api/                # API接口定义
│   ├── app.json            # 小程序配置
│   ├── app.scss            # 全局样式
│   ├── app.ts              # 小程序入口文件
│   ├── assets/             # 静态资源
│   ├── components/         # 自定义组件
│   ├── config/             # 配置文件
│   ├── custom-tab-bar/     # 自定义tabBar
│   ├── miniprogram_npm/    # 第三方依赖
│   ├── packageA/           # 分包A
│   ├── pages/              # 页面文件
│   ├── sitemap.json        # 小程序 sitemap
│   └── utils/              # 工具函数
├── package.json            # 项目依赖
├── pnpm-lock.yaml          # 依赖锁文件
├── project.config.json     # 项目配置
└── typings/                # 类型定义
```

## 四、功能模块

### 4.1 首页模块

- 轮播图展示
- 快捷功能入口
- 视力健康资讯

### 4.2 设备模块

- 设备连接与管理
- 设备任务列表
- 任务完成记录

### 4.3 训练模块

- 近视防控训练
- Hart字母表训练
- 训练数据记录

### 4.4 个人中心

- 用户信息管理
- 视力健康报告
- 积分商城

### 4.5 商城模块

- 商品列表
- 购物车
- 订单管理

## 五、页面模块

### 5.1 主包页面

- **首页** (/pages/home/index)：展示轮播图、快捷功能入口和视力健康资讯
  ![首页截图](docs/ui/page-screenshots/home.png)
- **分类页** (/pages/category/index)：商品分类展示
  ![分类页截图](docs/ui/page-screenshots/category.png)
- **设备页** (/pages/device/index)：设备连接与管理、任务列表
  ![设备页截图](docs/ui/page-screenshots/device.png)
- **购物车** (/pages/cart/index)：商品购物车
  ![购物车截图](docs/ui/page-screenshots/cart.png)
- **个人中心** (/pages/profile/index)：用户信息、健康报告、积分商城
  ![个人中心截图](docs/ui/page-screenshots/profile.png)
- **引导页** (/pages/guide/index)：新用户引导
  ![引导页截图](docs/ui/page-screenshots/guide.png)

### 5.2 分包A页面

- **商品详情** (/packageA/pages/goods-detail/index)：商品详细信息展示
  ![商品详情截图](docs/ui/page-screenshots/goods-detail.png)
- **地址** (/packageA/pages/address/index)：用户地址管理
  ![地址截图](docs/ui/page-screenshots/address.png)
- **地址编辑** (/packageA/pages/address-edit/index)：新增或编辑用户地址
  ![地址编辑截图](docs/ui/page-screenshots/address-edit.png)
- **订单确认** (/packageA/pages/order-confirm/index)：订单确认页面
  ![订单确认截图](docs/ui/page-screenshots/order-confirm.png)
- **订单列表** (/packageA/pages/order-list/index)：用户订单列表
  ![订单列表截图](docs/ui/page-screenshots/order-list.png)
- **订单详情** (/packageA/pages/order-detail/index)：订单详细信息
  ![订单详情截图](docs/ui/page-screenshots/order-detail.png)
- **搜索** (/packageA/pages/search/index)：商品搜索功能
  ![搜索截图](docs/ui/page-screenshots/search.png)
- **积分商城** (/packageA/pages/points-mall/index)：积分商品展示
  ![积分商城截图](docs/ui/page-screenshots/points-mall.png)
- **积分商品详情** (/packageA/pages/points-goods-detail/index)：积分商品详细信息
  ![积分商品详情截图](docs/ui/page-screenshots/points-goods-detail.png)
- **积分订单详情** (/packageA/pages/points-order-detail/index)：积分订单详细信息
  ![积分订单详情截图](docs/ui/page-screenshots/points-order-detail.png)
- **积分订单列表** (/packageA/pages/points-order-list/index)：用户积分订单列表
  ![积分订单列表截图](docs/ui/page-screenshots/points-order-list.png)
- **签到** (/packageA/pages/sign-in/index)：用户签到功能
  ![签到截图](docs/ui/page-screenshots/sign-in.png)
- **会员商品详情** (/packageA/pages/vip-goods-detail/index)：会员商品详细信息
  ![会员商品详情截图](docs/ui/page-screenshots/vip-goods-detail.png)
- **设备任务** (/packageA/pages/device-task/index)：设备任务列表
  ![设备任务截图](docs/ui/page-screenshots/device-task.png)
- **设备任务详情** (/packageA/pages/device-task-detail/index)：设备任务详细信息和完成情况
  ![设备任务详情截图](docs/ui/page-screenshots/device-task-detail.png)
- **设备创建自定义任务** (/packageA/pages/device-create-custom-task/index)：创建自定义设备任务
  ![设备创建自定义任务截图](docs/ui/page-screenshots/device-create-custom-task.png)

## 六、API接口

### 5.1 用户相关

- 登录接口 `/login`
- 用户信息接口 `/user/info`
- 用户更新接口 `/user/update`

### 5.2 设备相关

- 设备列表接口 `/device/list`
- 设备任务接口 `/device/task`
- 任务完成接口 `/device/task/complete`

### 5.3 训练相关

- 训练列表接口 `/training/list`
- 训练详情接口 `/training/detail`
- 训练记录接口 `/training/record`

### 5.4 积分商城相关

- 商品列表接口 `/points-mall/goods`
- 积分记录接口 `/points-mall/record`
- 兑换商品接口 `/points-mall/exchange`

## 六、部署说明

### 6.1 开发环境

1. 安装微信开发者工具
2. 克隆项目代码
3. 安装依赖: `pnpm install`
4. 在微信开发者工具中导入项目
5. 配置appid
6. 运行项目

### 6.2 生产环境

1. 配置`.env.production`文件
2. 执行构建命令
3. 通过微信开发者工具上传代码
4. 在微信公众平台提交审核
5. 审核通过后发布正式版

## 七、注意事项

1. 项目使用TypeScript开发，请确保开发环境支持
2. 部分功能依赖后端API，请确保API服务正常运行
3. 项目使用分包加载，请注意分包大小限制
4. 开发前请仔细阅读项目中的README.md文件
5. 代码提交前请确保通过ESLint检查
6. 涉及敏感信息如API密钥等，请妥善保管

## 八、版本信息

- 版本号: 1.0.0
- 主要功能: 基础视力检测、近视防控训练、积分商城

---

以上是眼健康视力小程序的交付文档，如有任何疑问，请随时联系项目负责人。
