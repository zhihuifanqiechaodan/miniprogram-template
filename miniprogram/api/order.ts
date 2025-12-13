import {
  IApiMallOrdersCreateReq,
  IApiMallOrdersCreateRes,
  IApiMallOrdersGetAllReq,
  IApiMallOrdersGetAllRes,
  IApiMallOrdersGetReq,
  IApiMallOrdersGetRes,
  IApiMallOrdersConfirmReq,
  IApiMallOrdersConfirmRes,
  IApiMallOrdersCancelReq,
  IApiMallOrdersCancelRes,
} from '@/typings/api-types/order';
import { requestA, FunctionsType } from '@miniprogram/utils/request';

export const mallOrdersCreate = (data: IApiMallOrdersCreateReq): Promise<IApiMallOrdersCreateRes> => {
  return requestA<IApiMallOrdersCreateRes>({
    type: FunctionsType.mall_orders_create,
    params: data,
  });
};

export const mallOrdersGetAll = (data: IApiMallOrdersGetAllReq): Promise<IApiMallOrdersGetAllRes> => {
  return requestA<IApiMallOrdersGetAllRes>({
    type: FunctionsType.mall_orders_get_all,
    params: data,
  });
};

export const mallOrdersGet = (data: IApiMallOrdersGetReq): Promise<IApiMallOrdersGetRes> => {
  return requestA<IApiMallOrdersGetRes>({
    type: FunctionsType.mall_orders_get,
    params: data,
  });
};

export const mallOrdersConfirm = (data: IApiMallOrdersConfirmReq): Promise<IApiMallOrdersConfirmRes> => {
  return requestA<IApiMallOrdersConfirmRes>({
    type: FunctionsType.mall_orders_confirm,
    params: data,
  });
};

export const mallOrdersCancel = (data: IApiMallOrdersCancelReq): Promise<IApiMallOrdersCancelRes> => {
  return requestA<IApiMallOrdersCancelRes>({
    type: FunctionsType.mall_orders_cancel,
    params: data,
  });
};
