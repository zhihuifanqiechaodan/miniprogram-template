import { ApiResponse } from '@/typings/api-types/api';

export interface IApiMallCategoriesCreateReq {
  name: string;
  icon_url: string;
  order?: number;
  is_enabled: boolean;
}
export type IApiMallCategoriesCreateRes = ApiResponse<null>;

export interface IApiMallCategoriesDeleteReq {
  category_id: string;
}
export type IApiMallCategoriesDeleteRes = ApiResponse<null>;

export interface IApiMallCategoriesUpdateReq {
  category_id: string;
  name: string;
  icon_url: string;
  order?: number;
  is_enabled: boolean;
}
export type IApiMallCategoriesUpdateRes = ApiResponse<null>;

export interface IApiMallCategoriesGetAllReq {
  pageNum: number;
  pageSize?: number;
  is_enabled?: boolean;
}
export interface IApiMallCategoriesGetAllItem {
  _id: string;
  name: string;
  icon_url: string;
  order: number;
  is_enabled: boolean;
  updated_at: string;
}
export interface IApiMallCategoriesGetAll {
  records: IApiMallCategoriesGetAllItem[];
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
export type IApiMallCategoriesGetAllRes = ApiResponse<IApiMallCategoriesGetAll>;
