import { ApiResponse } from '@/typings/api-types/api';

interface IApiRegionProvinceInfoItem {
  id: string;
  name: string;
  nameEn: string;
  pinyin: string;
  jianpin: string;
  firstLetter: string;
  level: number;
}

interface IApiRegionChildInfoItem {
  id: string;
  name: string;
  nameEn: string;
  pinyin: string;
  jianpin: string;
  firstLetter: string;
  level: number;
  pid: string;
}

export interface IApiRegionChildInfoReq {
  pid: string;
}

export type IApiRegionProvinceInfoResponse = ApiResponse<IApiRegionProvinceInfoItem[]>;
export type IApiRegionChildInfoResponse = ApiResponse<IApiRegionChildInfoItem[]>;
