import {
  IApiMallCategoriesCreateReq,
  IApiMallCategoriesCreateRes,
  IApiMallCategoriesDeleteReq,
  IApiMallCategoriesDeleteRes,
  IApiMallCategoriesUpdateReq,
  IApiMallCategoriesUpdateRes,
  IApiMallCategoriesGetAllReq,
  IApiMallCategoriesGetAllRes,
} from '@/typings/api-types/category';
import { requestA, FunctionsType } from '@miniprogram/utils/request';

export const mallCategoriesCreate = (data: IApiMallCategoriesCreateReq): Promise<IApiMallCategoriesCreateRes> => {
  return requestA<IApiMallCategoriesCreateRes>({
    type: FunctionsType.mall_categories_create,
    params: data,
  });
};

export const mallCategoriesDelete = (data: IApiMallCategoriesDeleteReq): Promise<IApiMallCategoriesDeleteRes> => {
  return requestA<IApiMallCategoriesDeleteRes>({
    type: FunctionsType.mall_categories_delete,
    params: data,
  });
};

export const mallCategoriesUpdate = (data: IApiMallCategoriesUpdateReq): Promise<IApiMallCategoriesUpdateRes> => {
  return requestA<IApiMallCategoriesUpdateRes>({
    type: FunctionsType.mall_categories_update,
    params: data,
  });
};

export const mallCategoriesGetAll = (data: IApiMallCategoriesGetAllReq): Promise<IApiMallCategoriesGetAllRes> => {
  return requestA<IApiMallCategoriesGetAllRes>({
    type: FunctionsType.mall_categories_get_all,
    params: data,
  });
};
