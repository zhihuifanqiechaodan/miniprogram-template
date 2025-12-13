import { ApiResponse } from '@/typings/api-types/api';

export interface IApiMallProductSkuItem {
  sku_id?: string;
  spec: string;
  sell_price: number;
  original_price: number;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface IApiMallProductItem {
  _id: string;
  name: string;
  category_id: string;
  images: string[];
  is_enabled: boolean;
  description: string;
  skus: IApiMallProductSkuItem[];
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
}

export interface IApiMallProductsCreateReq {
  name: string;
  category_id: string;
  images: string[];
  is_enabled: boolean;
  description: string;
  skus: Omit<IApiMallProductSkuItem, 'sku_id'>[];
}
export type IApiMallProductsCreateRes = ApiResponse<null>;

export interface IApiMallProductsDeleteReq {
  product_id: string;
}
export type IApiMallProductsDeleteRes = ApiResponse<null>;

export interface IApiMallProductsUpdateReq {
  product_id: string;
  name: string;
  category_id: string;
  images: string[];
  is_enabled: boolean;
  description: string;
  skus: IApiMallProductSkuItem[];
}
export type IApiMallProductsUpdateRes = ApiResponse<null>;

export interface IApiMallProductsGetReq {
  product_id: string;
}
export interface IApiMallProductsGetData {
  productInfo: IApiMallProductItem;
}
export type IApiMallProductsGetRes = ApiResponse<IApiMallProductsGetData>;

export interface IApiMallProductsGetAllReq {
  pageNum: number;
  pageSize?: number;
  category_id?: string;
  is_enabled?: boolean;
}
export interface IApiMallProductsGetAll {
  records: IApiMallProductItem[];
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
export type IApiMallProductsGetAllRes = ApiResponse<IApiMallProductsGetAll>;
