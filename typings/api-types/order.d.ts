import { ApiResponse } from '@/typings/api-types/api';

export interface IApiMallOrderProductItem {
  product_id: string;
  name: string;
  images: string[];
  sku_id: string;
  spec: string;
  quantity: number;
  sell_price: number;
  original_price: number;
}

export type IApiMallOrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'refunded';

export interface IApiMallOrderItem {
  _id: string;
  user_id: string;
  total_amount: number;
  status: IApiMallOrderStatus;
  products: IApiMallOrderProductItem[];
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail_address: string;
  remark: string;
  created_at: string;
  updated_at: string;
}

export interface IApiMallOrdersCreateReq {
  cart_ids: string[];
  name: string;
  phone: string;
  province: string;
  province_id: string;
  city: string;
  city_id: string;
  district?: string;
  district_id?: string;
  detail_address: string;
  remark?: string;
}
export interface IApiMallOrdersCreateResData {
  orderInfo: {
    _id: string;
    // other fields might be returned by db.add usually just _id, but cloud function might return more
  };
}
export type IApiMallOrdersCreateRes = ApiResponse<IApiMallOrdersCreateResData>;

export interface IApiMallOrdersGetAllReq {
  pageNum: number;
  pageSize?: number;
  status?: IApiMallOrderStatus | '';
}
export interface IApiMallOrdersGetAll {
  records: IApiMallOrderItem[];
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
export type IApiMallOrdersGetAllRes = ApiResponse<IApiMallOrdersGetAll>;

export interface IApiMallOrdersGetReq {
  order_id: string;
}
export interface IApiMallOrdersGetData {
  orderInfo: IApiMallOrderItem;
}
export type IApiMallOrdersGetRes = ApiResponse<IApiMallOrdersGetData>;

export interface IApiMallOrdersConfirmReq {
  order_id: string;
}
export type IApiMallOrdersConfirmRes = ApiResponse<null>;

export interface IApiMallOrdersCancelReq {
  order_id: string;
}
export type IApiMallOrdersCancelRes = ApiResponse<null>;
