import { ApiResponse } from '@/typings/api-types/api';

export interface IApiMallCartsCreateReq {
  product_id: string;
  quantity: number;
  sku_id: string;
}
export type IApiMallCartsCreateRes = ApiResponse<null>;

export interface IApiMallCartsDeleteReq {
  cart_id: string;
}
export type IApiMallCartsDeleteRes = ApiResponse<null>;

export interface IApiMallCartsUpdateReq {
  cart_id: string;
  product_id: string;
  sku_id: string;
  quantity: number;
}
export type IApiMallCartsUpdateRes = ApiResponse<null>;

export interface IApiMallCartsGetAllReq {
  pageNum: number;
  pageSize?: number;
}
export interface IApiMallCartsGetAllItem {
  _id: string;
  user_id: string;
  product_id: string;
  sku_id: string;
  quantity: number;
  updated_at: string;
  // Enhanced fields from aggregation
  product_name: string;
  product_image: string;
  spec: string;
  sell_price: number;
  original_price: number;
  is_enabled: boolean;
}
export interface IApiMallCartsGetAll {
  records: IApiMallCartsGetAllItem[];
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
export type IApiMallCartsGetAllRes = ApiResponse<IApiMallCartsGetAll>;
