---
name: miniprogram-api-conventions
description: 本仓库微信小程序接口封装与类型声明规范。仅在根据接口路径新增或修改 miniprogram/api 下的方法、补充 typings/api-types 下的请求响应类型、维护 api-types index 导出时使用。
---

# 小程序接口封装与类型规范

## 适用场景

- 根据接口路径和请求方法新增或修改 `miniprogram/api/` 下的接口方法
- 根据请求参数、响应数据新增或修改 `typings/api-types/` 下的类型声明
- 需要按接口路径决定 API 文件名、类型文件名、方法名或类型名
- 新增类型文件后，需要同步维护 `typings/api-types/index.d.ts`

## 不适用场景

- 仅修改页面 UI、组件结构、页面样式
- 仅修改页面逻辑、状态处理、生命周期，但不涉及接口封装或类型声明
- 纯文案替换，且不涉及接口字段变更

## 文件落位规则

### API 文件

- 请求路径去掉开头 `/` 后，取第一个路径段作为文件名。
- 例如 `/auth/login` 对应 `miniprogram/api/auth.ts`。
- 若文件已存在，则在原文件中追加新方法；若不存在，则新建该文件。

### 类型文件

- 类型声明统一放在 `typings/api-types/` 下。
- 文件名规则与 API 文件一致，使用请求路径的第一个路径段。
- 例如 `/auth/login` 对应 `typings/api-types/auth.d.ts`。
- 若类型文件不存在，需要新建；若已存在，则在原文件中追加接口类型。

## 命名规则

### API 方法名

- 方法名前缀与 `@miniprogram/utils/request` 中实际使用的方法保持一致：`get`、`post`、`del`。
- 后半段使用请求路径各段的 PascalCase 拼接。
- 示例：
  - `POST /auth/login` -> `postAuthLogin`
  - `GET /auth/profile` -> `getAuthProfile`
  - `DELETE /auth/logout` -> `delAuthLogout`

### 类型名

- 请求类型：`IApi` + 方法名前缀首字母大写 + 路径 PascalCase + `Req`（仅在接口存在请求参数时声明）
- 响应类型：`IApi` + 方法名前缀首字母大写 + 路径 PascalCase + `Res`
- 示例：
  - `POST /auth/login` -> `IApiPostAuthLoginReq`、`IApiPostAuthLoginRes`
  - `DELETE /auth/logout` -> `IApiDelAuthLogoutReq`、`IApiDelAuthLogoutRes`
  - `GET /stats/overview`（无参数）-> `IApiGetStatsOverviewRes`（不声明 `IApiGetStatsOverviewReq`）

## 实现规则

### 请求方法导入

- 根据请求方法，从 `@miniprogram/utils/request` 引入对应方法：
  - `GET` -> `get`
  - `POST` -> `post`
  - `DELETE` -> `del`

### 注释规范

- 新增 API 文件、导出的 API 方法、接口类型、辅助类型都必须补充中文注释。
- 导出的 API 方法统一使用 JSDoc，格式采用以下形式：

```ts
/**
 * @method postAuthLogin 登录
 * @param data 登录请求参数
 * @returns {Promise<IApiPostAuthLoginRes>} 登录响应
 */
export const postAuthLogin = (data: IApiPostAuthLoginReq): Promise<IApiPostAuthLoginRes> => {
	return post<IApiPostAuthLoginRes>({
		url: `${baseUrl}/auth/login`,
		data
	});
};
```

- `@method` 后面先写方法名，再写中文语义说明，例如“登录”“获取详情”“删除记录”。
- 有入参时必须写 `@param` 并补中文说明；无入参时不写 `@param`。有返回值时补 `@returns` 中文说明。
- 类型字段优先使用行尾中文注释说明字段含义，例如 `token: string; // 登录令牌`。
- 新增导出常量或变量时，也要补充中文注释，避免只保留英文命名。

### API 方法结构

- 从 `@/typings/api-types` 引入对应的响应类型；有请求参数时再引入请求类型。
- 从 `@miniprogram/config/index` 引入 `baseUrl`。
- `url` 必须与提供的接口路径保持一致，使用 `${baseUrl}${path}` 形式拼接。
- 有请求体时，方法参数命名使用 `data`；无请求体时按接口实际情况决定是否省略。

示例：

```ts
import { IApiPostAuthLoginReq, IApiPostAuthLoginRes } from "@/typings/api-types";
import { baseUrl } from "@miniprogram/config/index";
import { post } from "@miniprogram/utils/request";

/**
 * @method postAuthLogin 登录
 * @param data 登录请求参数
 * @returns {Promise<IApiPostAuthLoginRes>} 登录响应
 */
export const postAuthLogin = (data: IApiPostAuthLoginReq): Promise<IApiPostAuthLoginRes> => {
	return post<IApiPostAuthLoginRes>({
		url: `${baseUrl}/auth/login`,
		data
	});
};
```

无请求参数示例：

```ts
import { IApiGetStatsOverviewRes } from "@/typings/api-types";
import { baseUrl } from "@miniprogram/config/index";
import { get } from "@miniprogram/utils/request";

/**
 * @method getStatsOverview 获取首页概览统计
 * @returns {Promise<IApiGetStatsOverviewRes>} 首页概览统计响应
 */
export const getStatsOverview = (): Promise<IApiGetStatsOverviewRes> => {
	return get<IApiGetStatsOverviewRes>({
		url: `${baseUrl}/stats/overview`,
	});
};
```

### 类型声明结构

- 根据提供的请求参数（若有）和响应数据补齐类型：有请求参数才声明 `Req`，无请求参数只声明 `Res`。
- 如果响应里包含结构化对象，可在同一个类型文件中补充辅助接口，例如 `IApiUser`。
- 当前接口专用的辅助类型可留在同文件；跨多个接口复用的公共类型，再考虑抽到公共类型文件。
- 新增类型声明时，字段优先使用中文行尾注释解释含义。

示例：

```ts
interface IApiUser {
	id: string; // 用户 ID（ULID）
	nickname: string; // 用户昵称
	email: string; // 用户邮箱
	bio: string; // 用户简介
	avatarUrl: string; // 用户头像 URL
	roles: string[]; // 用户角色列表
	permissions: string[]; // 用户权限 slug 列表
	status: string; // 更精确可以是 'normal' | 'disabled' | 'pending' 等
	schoolId: string; // 院校 ID
	isSchoolVerified: boolean; // 是否已完成院校验证
	admissionDate: string; // 入学日期（ISO）
	createdAt: string; // 创建时间（ISO）
	updatedAt: string; // 更新时间（ISO）
}

export interface IApiPostAuthLoginReq {
	email: string;
	password: string;
}

export interface IApiPostAuthLoginRes {
	token: string;
	tokenType: string;
	user: IApiUser;
}
```

## 执行清单

- 先根据请求路径确定 `miniprogram/api/*.ts` 和 `typings/api-types/*.d.ts` 的目标文件。
- 检查目标文件是否已存在；存在则追加，不存在则新建。
- 按请求方法选择 `get`、`post`、`del`，并保持方法名、类型名前缀一致。
- 按提供的请求参数（若有）和响应数据补齐类型：有参数补 `Req` + `Res`，无参数只补 `Res`。
- 检查新增 API 方法、类型声明、导出变量是否都补上了中文注释。
- 新增类型文件后，同步检查并更新 `typings/api-types/index.d.ts` 导出。
- 如无其他明确约定，优先参考现有 `miniprogram/api/auth.ts` 与 `typings/api-types/auth.d.ts` 的写法。
