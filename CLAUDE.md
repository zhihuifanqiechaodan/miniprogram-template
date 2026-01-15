# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
├── packageA/         # Subpackage A for order/address/product detail pages
├── packageB/         # Subpackage B for admin features
├── pages/            # Main package pages (home, category, device, cart, profile)
└── utils/            # Utility functions (request.ts, router.ts, util.ts)

cloudfunctions/       # WeChat cloud functions
typings/              # TypeScript type definitions
```

### Key Patterns

**API Calls**: All API requests go through `miniprogram/utils/request.ts` which wraps `wx.cloud.callFunction`. API modules in `api/` use `FunctionsType` enum to identify cloud functions.

**Routing**: Use helpers from `miniprogram/utils/util.ts`: `navigateTo`, `redirectTo`, `switchTab`, `reLaunch`, `navigateBack`. All wrap native APIs with network connectivity checks.

**Global State**: `getApp().globalData` stores system info, network status, user state. Defined in `typings/index.d.ts` as `IAppOption`.

**Event Bus**: `eventBus` in `util.ts` for cross-component communication with methods: `addEventListener`, `triggerEventListener`, `removeEventListener`.

**Cloud Functions**: Each cloud function is identified by a `type` string. The `requestA` function in `request.ts` calls `mallFunctions` cloud function with `type` and `params`.

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
- Custom navigation via `custom-nav-bar` component with `navigationStyle: custom` in app.json
- Use `wx.nextTick()` for DOM updates after data changes
- Component properties use `type`, `value` pattern with optional `observer`
- `getCurrentPages()` for navigating between existing pages

## Build & Upload Notes

- `generate-env.js` reads `.env.{environment}` and generates `miniprogram/config/env.js`
- `miniprogram-ci.js` handles npm packaging and upload via `miniprogram-ci`
- Upload requires `private.{appId}.key` file for authentication
- Uses Skyline renderer with glass-easel component framework
