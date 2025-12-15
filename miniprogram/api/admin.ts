import { IApiMallAdminDataGetRes } from '@/typings/api-types';
import { requestA } from '@miniprogram/utils/request';
import { FunctionsType } from '@miniprogram/utils/request';

export const mallAdminDataGet = (): Promise<IApiMallAdminDataGetRes> => {
  return requestA<IApiMallAdminDataGetRes>({
    type: FunctionsType.mall_admin_data_get,
  });
};
