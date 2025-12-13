import { ApiResponse } from '@/typings/api-types/api';

export interface IApiMallBannersGetAllReq {
  pageNum: number;
  pageSize?: number;
}

export interface IApiMallBannersGetAllItem {
  _id: string;
  title: string;
  image_url: string;
  link_url: string;
  order: number;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface IApiMallBannersGetAll {
  records: IApiMallBannersGetAllItem[];
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export type IApiMallBannersGetAllRes = ApiResponse<IApiMallBannersGetAll>;

export interface IApiMallBannersCreateReq {
  title: string;
  image_url: string;
  link_url?: string;
  order?: number;
  is_enabled: boolean;
}

export type IApiMallBannersCreateRes = ApiResponse<null>;

export interface IApiMallBannersDeleteReq {
  banner_id: string;
}

export type IApiMallBannersDeleteRes = ApiResponse<null>;

export interface IApiMallBannersUpdateReq {
  banner_id: string;
  title: string;
  image_url: string;
  link_url?: string;
  order?: number;
  is_enabled: boolean;
}

export type IApiMallBannersUpdateRes = ApiResponse<null>;
