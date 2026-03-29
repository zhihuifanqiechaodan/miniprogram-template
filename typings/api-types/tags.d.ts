/**
 * 查询标签列表请求参数
 */
export interface IApiGetTagsReq {
  keyword?: string; // 关键词（按标签名称模糊匹配）
  type?: string; // 标签类型过滤
  includeDeleted?: boolean; // 是否包含已删除标签
  limit: number; // 返回数量
  offset?: number; // 偏移量
}

/**
 * 标签列表单项数据
 */
export interface IApiGetTagsItem {
  id: string; // 标签 ID（ULID）
  name: string; // 标签名称
  type: string; // 标签类型
  active?: boolean; // 是否选中（前端字段）
  deletedAt: string | null; // 删除时间（ISO）
  createdAt: string; // 创建时间（ISO）
  updatedAt: string; // 更新时间（ISO）
}

/**
 * 查询标签列表响应数据
 */
export interface IApiGetTagsRes {
  items: IApiGetTagsItem[]; // 标签列表
}
