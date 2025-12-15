import { ApiResponse } from '@/typings/api-types/api';

export interface IApiMallAdminDataGet {
  bannersCount: number;
  categoriesCount: number;
  productsCount: number;
}

export type IApiMallAdminDataGetRes = ApiResponse<IApiMallAdminDataGet>;
