import {
  IApiMallBannersGetAllRes,
  IApiMallBannersGetAllReq,
  IApiMallBannersCreateReq,
  IApiMallBannersCreateRes,
  IApiMallBannersDeleteReq,
  IApiMallBannersDeleteRes,
  IApiMallBannersUpdateReq,
  IApiMallBannersUpdateRes,
} from '@/typings/api-types/banner';
import { requestA } from '@miniprogram/utils/request';
import { FunctionsType } from '@miniprogram/utils/request';

export const mallBannersGetAll = (data: IApiMallBannersGetAllReq): Promise<IApiMallBannersGetAllRes> => {
  return requestA<IApiMallBannersGetAllRes>({
    type: FunctionsType.mall_banners_get_all,
    params: data,
  });
};

export const mallBannersCreate = (data: IApiMallBannersCreateReq): Promise<IApiMallBannersCreateRes> => {
  return requestA<IApiMallBannersCreateRes>({
    type: FunctionsType.mall_banners_create,
    params: data,
  });
};

export const mallBannersDelete = (data: IApiMallBannersDeleteReq): Promise<IApiMallBannersDeleteRes> => {
  return requestA<IApiMallBannersDeleteRes>({
    type: FunctionsType.mall_banners_delete,
    params: data,
  });
};

export const mallBannersUpdate = (data: IApiMallBannersUpdateReq): Promise<IApiMallBannersUpdateRes> => {
  return requestA<IApiMallBannersUpdateRes>({
    type: FunctionsType.mall_banners_update,
    params: data,
  });
};
