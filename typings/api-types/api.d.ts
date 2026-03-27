/**
 * 通用接口响应结构
 * @template T 业务响应数据结构
 */
export interface ApiResponse<T = unknown> {
  code: number; // 业务状态码
  msg: string; // 提示信息
  data: T; // 业务数据
}
