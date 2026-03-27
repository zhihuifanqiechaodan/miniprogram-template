# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent Loading

- 通用代理约定统一以根目录 `AGENTS.md` 为准。
- 专项规范统一放在根目录 `skills/` 下，不在本文件中重复维护。
- 仅当任务命中触发条件时，再读取对应的 `skills/*/SKILL.md`。

## Project Overview

WeChat Mini Program (小程序) project using TypeScript, SCSS, and Vant Weapp UI components. Features include e-commerce functionality (products, cart, orders), user management, and cloud functions for backend API.

## Common Commands

```bash
# Install dependencies
pnpm install

# Generate environment config (creates miniprogram/config/env.js)
pnpm run gen:env:dev   # Development environment
pnpm run gen:env:prod  # Production environment

# Build and upload to WeChat
pnpm run build:dev     # Build + upload for development
pnpm run build:prod    # Build + upload for production

# Code quality
pnpm run lint          # Fix ESLint errors
pnpm run lint-all      # Fix ESLint errors in all files
pnpm run format        # Format code with Prettier
pnpm run format-all    # Format all files with Prettier
```

## Architecture

### Directory Structure

```
miniprogram/
├── api/              # API functions - each module (banner, product, order, etc.) has dedicated files
├── assets/           # Static resources (images, fonts, styles)
├── components/       # Reusable custom components
├── config/           # Generated environment config (env.js)
├── custom-tab-bar/   # Custom tab bar implementation
├── packageA/         # Subpackage A for non-tabbar pages (order/address/product detail, etc.)
├── packageB/         # Subpackage B for admin features
├── pages/            # Main package - tabbar pages only (home, review, profile)
└── utils/            # Utility functions (request.ts, router.ts, util.ts)

cloudfunctions/       # WeChat cloud functions
typings/              # TypeScript type definitions
```

### Subpackage Rule

- **Main package (`pages/`)**: Only tabbar pages should be placed here
- **Subpackages (`packageA/`, `packageB/`)**: All non-tabbar pages (e.g., course detail, order detail, settings) must be placed in subpackages

### Key Patterns

**API Calls**: All API requests go through `miniprogram/utils/request.ts` which wraps `wx.cloud.callFunction`. API modules in `api/` use `FunctionsType` enum to identify cloud functions.

**Routing**: Use `navigateTo` from `miniprogram/utils/util.ts` as the unified routing helper. It wraps native APIs with network connectivity checks and supports `type: 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch' | 'navigateBack'`.

**Global State**: `getApp().globalData` stores system info, network status, user state. Defined in `typings/index.d.ts` as `IAppOption`.

**Event Bus**: `eventBus` in `util.ts` for cross-component communication with methods: `addEventListener`, `triggerEventListener`, `removeEventListener`.

**Cloud Functions**: Each cloud function is identified by a `type` string. The `requestA` function in `request.ts` calls `mallFunctions` cloud function with `type` and `params`.

**Page Routing**: All pages must be declared in `miniprogram/utils/router.ts` with a route config object containing `text` and `pagePath`. Use `buildUrl()` and `navigateTo()` from `miniprogram/utils/util.ts` together with route configs from `router.ts`.

```typescript
import { CourseDetail, Home } from '@miniprogram/utils/router';
import { buildUrl, navigateTo } from '@miniprogram/utils/util';

// 普通页面跳转（支持参数）
const url = buildUrl(CourseDetail, { id: 1 });
navigateTo({ url });

// TabBar 页面跳转
navigateTo({ type: 'switchTab', url: Home.pagePath });
```

### Path Aliases

- `@miniprogram/*` → `./miniprogram/*`
- `@vant/*` → `./miniprogram/miniprogram_npm/@vant/*`
- `@/*` → `./` (root)

### TypeScript Types

- `ApiResponse<T>` in `typings/api-types/api.d.ts` - Standard API response structure with `code`, `message`, `data`
- Domain-specific types in `typings/api-types/` (banner, category, product, order, shopping-cart, admin)

## WeChat-Specific Conventions

- Use `wx.cloud.init()` in `app.ts` for cloud development
- Network status tracked globally via `wx.onNetworkStatusChange`
- Pages use `Component()` constructor (not options object)
- Custom navigation via `com-nav-bar` component with `navigationStyle: custom` in app.json
- Use `wx.nextTick()` for DOM updates after data changes
- Component properties use `type`, `value` pattern with optional `observer`
- `getCurrentPages()` for navigating between existing pages

## Build & Upload Notes

- `generate-env.js` reads `.env.{environment}` and generates `miniprogram/config/env.js`
- `miniprogram-ci.js` handles npm packaging and upload via `miniprogram-ci`
- Upload requires `private.{appId}.key` file for authentication
- Uses Skyline renderer with glass-easel component framework

## Code Style Guidelines

### TypeScript

- **缩进**: 2 空格
- **文件头**: 简洁行注释 `// pages/path/filename.ts`
- **空模块导出**: 每个页面文件以 `export {};` 开头（用于区分模块作用域）
- **变量命名**: camelCase
- **常量命名**: camelCase（函数式常量，如 `export const tabbarRoutes = [...]`）
- **接口/类型命名**: PascalCase，以 `I` 为前缀（如 `IAppOption`、`CourseItem`）
- **事件对象类型**: `WechatMiniprogram.CustomEvent`
- **全局数据访问**: `const app: IAppOption = getApp();`

### WXML Template

- **缩进**: 2 空格
- **属性换行**: 属性过长时自动换行，Mustache 表达式与属性名之间有空格
- **注释风格**: HTML 注释 `<!-- comment -->`
- **wx:for 使用**: `<block wx:for="{{list}}" wx:key="id">`

### SCSS/CSS

- **缩进**: 2 空格
- **分号**: 属性值末尾**必须**使用分号
- **注释风格**: C 风格行注释 `// comment`
- **单位**: 移动端使用 `rpx` 单位
- **嵌套**: 使用 SCSS 嵌套选择器

### Event Handler Naming

- **用户交互事件**: 使用 `handle` 前缀
  - `handleSubmit()`, `handleExit()`, `handleNavigateBack()`
- **生命周期/回调事件**: 使用 `on` 前缀
  - `onLoad()`, `onShow()`, `onCourseChange(e)`

### Page/Component Structure

```typescript
// pages/xxx/index.ts
export {};
const app: IAppOption = getApp();

Page({
  data: {
    // 初始数据
  },

  onLoad() {},

  onShow() {},

  // 事件处理函数
  handleSubmit() {},
});
```

```typescript
// components/xxx/index.ts
Component({
  properties: {
    propName: {
      type: Boolean,
      value: true,
    },
  },

  data: {},

  methods: {
    handleAction() {},
  },

  lifetimes: {
    attached() {},
  },
});
```
