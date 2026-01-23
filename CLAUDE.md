# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeChat Mini Program (小程序) project using TypeScript, SCSS, and Vant Weapp UI components. Features include custom navigation, tab bar handling, and reusable components.

## Common Commands

```bash
# Install dependencies
pnpm install

# Generate environment config (creates miniprogram/config/env.ts)
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
├── assets/           # Static resources (images, fonts, styles)
├── components/       # Reusable custom components
├── config/           # Generated environment config (env.ts)
├── custom-tab-bar/   # Custom tab bar implementation
├── pages/            # Main package pages (home, profile)
└── utils/            # Utility functions (util.ts, router.ts)

typings/              # TypeScript type definitions
cloudfunctions/       # WeChat cloud functions
```

### Key Patterns

**Routing**: Use helpers from `miniprogram/utils/util.ts`: `navigateTo`, `redirectTo`, `switchTab`, `reLaunch`, `navigateBack`. All wrap native APIs with network connectivity checks and fallback to `redirectTo` on failure.

**Route Config**: Define page routes in `miniprogram/utils/router.ts` using `RouteConfig` interface with `text`, `pagePath`, `iconPath`, and `selectedIconPath`.

**Global State**: `getApp().globalData` stores system info, network status, user state. Defined in `typings/index.d.ts` as `IAppOption`.

**Event Bus**: `eventBus` in `util.ts` for cross-component communication with methods: `addEventListener`, `triggerEventListener`, `removeEventListener`.

**Network Handling**: Routing helpers automatically check `isConnected` from `globalData` and show a Toast if offline.

### Path Aliases

- `@miniprogram/*` → `./miniprogram/*`
- `@vant/*` → `./miniprogram/miniprogram_npm/@vant/*`
- `@/*` → `./` (root)

### TypeScript Types

- `ApiResponse<T>` in `typings/api-types/api.d.ts` - Standard API response structure with `code`, `message`, `data`
- `IAppOption` in `typings/index.d.ts` - App global data interface
- Domain-specific types in `typings/api-types/` (banner, category, product, order, shopping-cart, admin)

## WeChat-Specific Conventions

- Use `wx.cloud.init()` in `app.ts` for cloud development
- Network status tracked globally via `wx.onNetworkStatusChange`
- Pages use `Page()` constructor (not Component-based pages)
- Custom navigation via `custom-nav-bar` component with `navigationStyle: custom` in app.json
- Use `wx.nextTick()` for DOM updates after data changes
- Component properties use `type`, `value` pattern with optional `observer`
- `getCurrentPages()` for navigating between existing pages
- Use `setTabBarSelected()` from `util.ts` in `onShow` to update tab bar state
- Skyline renderer with glass-easel component framework enabled

## Build & Upload Notes

- `generate-env.js` reads `.env.{environment}` and generates `miniprogram/config/env.ts`
- `miniprogram-ci.js` handles npm packaging and upload via `miniprogram-ci`
- Upload requires `private.{appId}.key` file for authentication
- Version defined in `miniprogram/config/index.ts` from `env.ts`
- Uses `packNpmManually` for npm dependency packaging
