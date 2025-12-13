import {
  IApiMallProductsCreateReq,
  IApiMallProductsCreateRes,
  IApiMallProductsDeleteReq,
  IApiMallProductsDeleteRes,
  IApiMallProductsUpdateReq,
  IApiMallProductsUpdateRes,
  IApiMallProductsGetReq,
  IApiMallProductsGetRes,
  IApiMallProductsGetAllReq,
  IApiMallProductsGetAllRes,
} from '@/typings/api-types/product';
import { requestA, FunctionsType } from '@miniprogram/utils/request';

export const mallProductsCreate = (data: IApiMallProductsCreateReq): Promise<IApiMallProductsCreateRes> => {
  return requestA<IApiMallProductsCreateRes>({
    type: FunctionsType.mall_products_create,
    params: data,
  });
};

export const mallProductsDelete = (data: IApiMallProductsDeleteReq): Promise<IApiMallProductsDeleteRes> => {
  return requestA<IApiMallProductsDeleteRes>({
    type: FunctionsType.mall_products_delete,
    params: data,
  });
};

export const mallProductsUpdate = (data: IApiMallProductsUpdateReq): Promise<IApiMallProductsUpdateRes> => {
  return requestA<IApiMallProductsUpdateRes>({
    type: FunctionsType.mall_products_update,
    params: data,
  });
};

export const mallProductsGet = (data: IApiMallProductsGetReq): Promise<IApiMallProductsGetRes> => {
  return requestA<IApiMallProductsGetRes>({
    type: FunctionsType.mall_products_get,
    params: data,
  });
};

export const mallProductsGetAll = (data: IApiMallProductsGetAllReq): Promise<IApiMallProductsGetAllRes> => {
  return requestA<IApiMallProductsGetAllRes>({
    type: FunctionsType.mall_products_get_all,
    params: data,
  });
};
