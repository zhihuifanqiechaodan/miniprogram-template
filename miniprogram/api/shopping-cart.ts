import {
  IApiMallCartsCreateReq,
  IApiMallCartsCreateRes,
  IApiMallCartsDeleteReq,
  IApiMallCartsDeleteRes,
  IApiMallCartsUpdateReq,
  IApiMallCartsUpdateRes,
  IApiMallCartsGetAllReq,
  IApiMallCartsGetAllRes,
} from '@/typings/api-types/shopping-cart';
import { requestA, FunctionsType } from '@miniprogram/utils/request';

export const mallCartsCreate = (data: IApiMallCartsCreateReq): Promise<IApiMallCartsCreateRes> => {
  return requestA<IApiMallCartsCreateRes>({
    type: FunctionsType.mall_carts_create,
    params: data,
  });
};

export const mallCartsDelete = (data: IApiMallCartsDeleteReq): Promise<IApiMallCartsDeleteRes> => {
  return requestA<IApiMallCartsDeleteRes>({
    type: FunctionsType.mall_carts_delete,
    params: data,
  });
};

export const mallCartsUpdate = (data: IApiMallCartsUpdateReq): Promise<IApiMallCartsUpdateRes> => {
  return requestA<IApiMallCartsUpdateRes>({
    type: FunctionsType.mall_carts_update,
    params: data,
  });
};

export const mallCartsGetAll = (data: IApiMallCartsGetAllReq): Promise<IApiMallCartsGetAllRes> => {
  return requestA<IApiMallCartsGetAllRes>({
    type: FunctionsType.mall_carts_get_all,
    params: data,
  });
};
