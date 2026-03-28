/**
 * 认证用户信息
 */
export interface IApiUser {
  id: string; // 用户 ID（ULID）
  nickname: string; // 用户昵称
  email: string; // 用户邮箱
  bio: string; // 用户简介
  avatarUrl: string; // 用户头像 URL
  roles: string[]; // 用户角色列表
  permissions: string[]; // 用户权限 slug 列表
  status: string; // 用户状态
  schoolId: string; // 院校 ID
  isSchoolVerified: boolean; // 是否已完成院校验证
  admissionDate: string; // 入学日期（ISO）
  createdAt: string; // 创建时间（ISO）
  updatedAt: string; // 更新时间（ISO）
}

/**
 * 获取当前用户资料响应数据
 */
export type IApiGetAuthMeRes = IApiUser;

/**
 * 登录请求参数
 */
export interface IApiPostAuthLoginReq {
  email: string; // 登录邮箱
  password: string; // 登录密码
}

/**
 * 登录响应数据
 */
export interface IApiPostAuthLoginRes {
  token: string; // 登录令牌
  tokenType: string; // 令牌类型
  user: IApiUser; // 当前登录用户
}
