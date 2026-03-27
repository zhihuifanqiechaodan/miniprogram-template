---
name: miniprogram-project-conventions
description: 本仓库微信小程序页面结构、样式、路由与跳转规范。仅在公共组件命名或引用、usingComponents 调整、页面或组件 json/wxml/scss/wxss 结构与样式变更、新增页面、页面路由定义或页面跳转调整时使用；纯业务逻辑改动不使用。
---

# 小程序页面结构、样式与路由规范

## 适用场景

- 新增、重命名、删除 `miniprogram/components/` 下的公共组件
- 修改页面或组件的 `usingComponents`
- 修改页面或组件 `json`、`wxml` 中的组件引入、组件标签、组件路径
- 修改页面或组件的结构、布局、样式，涉及 `wxml`、`scss`、`wxss`
- 新增页面、删除页面，或补充页面路由定义
- 修改页面跳转逻辑、跳转目标、跳转参数拼接
- 页面 UI 调整需要判断组件复用、组件选型或样式写法时

## 不适用场景

- 仅修改 `js`、`ts` 中的业务逻辑、请求、状态或生命周期，且不涉及页面路由定义或页面跳转
- 仅修改数据处理、接口参数、埋点、工具函数
- 纯文案替换，且不涉及组件结构、组件引用或样式调整

## 核心规则

### 注释规范

- 新增的方法、函数、导出变量、页面 `data` 字段、组件/页面内的重要变量声明，都必须补充中文注释。
- 方法和函数统一使用中文 JSDoc，格式采用以下形式：

```ts
/**
 * @method handleSearch 执行课程搜索
 * @param e 输入事件
 * @returns {void} 无返回值
 */
```

- 变量声明、对象字段、页面 `data` 字段优先使用行尾中文注释，格式例如：`keyword: '' // 搜索关键字`。
- 新增导出常量或配置项时，不要只保留英文命名，必须补充中文说明。

### 公共组件命名与引用

- `miniprogram/components/` 下的公共组件目录名必须统一使用 `com-` 前缀。
- 页面或组件的 `usingComponents` 中，公共组件别名也必须统一使用 `com-` 前缀。
- 公共组件重命名时，必须同步修改目录名、`usingComponents` 配置和模板中的组件标签。
- 修改组件命名或引用后，必须全局搜索旧名称，避免残留旧路径、旧别名或旧标签。

### usingComponents 顺序

- 页面级 `usingComponents` 必须按以下顺序声明：
  1. 第三方组件
  2. `/components` 下的公共自定义组件
  3. 页面私有组件

### 页面结构与样式

- 修改页面 UI 内容和样式时，小程序样式单位必须使用 `rpx`。
- 样式必须采用层级嵌套写法，例如在页面根 class 下继续嵌套子节点 class。
- 不使用 `&__`、`--` 这类 BEM 形式作为项目默认写法。
- 组件选型顺序必须保持一致：
  1. 优先复用项目内已有自定义组件
  2. 其次使用当前项目已安装的组件库组件
  3. 以上都不合适时，最后才自行实现

### 页面路由与跳转

- 新增页面时，除常规页面注册外，必须先在 `miniprogram/utils/router.ts` 中补充对应路由配置。
- 页面跳转目标必须优先从 `@miniprogram/utils/router` 引入路由配置，不直接硬编码 `/pages/...` 或 `/packageA/...` 路径。
- 需要拼接页面参数时，统一使用 `@miniprogram/utils/util` 中的 `buildUrl` 构造 URL。
- 页面跳转统一使用 `@miniprogram/utils/util` 中封装的 `navigateTo`、`redirectTo`、`switchTab`、`reLaunch`、`navigateBack`，不要在页面代码中直接调用 `wx.navigateTo`、`wx.redirectTo`、`wx.switchTab`、`wx.reLaunch`、`wx.navigateBack`。

## 执行清单

- 先判断任务是否命中“适用场景”；未命中时不要加载本 skill。
- 遇到页面、组件、路由或样式改动时，优先检查新增方法、变量声明、配置项是否已经补上中文注释。
- 遇到页面 UI 或样式改动时，优先检查单位、嵌套写法和组件选型顺序是否符合本规范。
- 遇到组件相关改动时，优先检查命名、引用和 `usingComponents` 顺序是否符合本规范。
- 遇到新增页面或页面跳转改动时，优先检查是否已在 `miniprogram/utils/router.ts` 定义路由，是否复用了路由常量，是否使用了 `@miniprogram/utils/util` 的跳转封装。
- 提交前确认 `json`、`wxml`、`scss`、`wxss` 中不存在旧组件名、旧路径或旧标签残留。
- 提交前确认页面代码中不存在新的硬编码页面路径，也不存在直接调用小程序原生页面跳转 API 的残留。
