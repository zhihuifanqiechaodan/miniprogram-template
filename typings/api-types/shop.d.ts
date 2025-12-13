import { ApiResponse } from '@/typings/api-types/api';

export interface WxsphConfig {
  id: number | null;
  name: string | null;
  first_cat_id?: number;
  second_cat_id?: number;
  third_cat_id?: number;
  qualification?: string;
  qualification_type?: number;
  product_qualification?: string;
  product_qualification_type?: number;
  audit_id?: string;
  auditResult?: {
    status: number;
  };
  dialogFormVisible?: boolean | null;
  qualification_passed?: boolean;
}

export interface IApiShopGoodsCategoryAllInfoItem {
  icon: string;
  id: number;
  isUse: boolean;
  key: string;
  level: number;
  name: string;
  paixu: number;
  pid: number;
  shopId: number;
  type: string;
  userId: number;
  wxsph?: string | WxsphConfig;
}

export type IApiShopGoodsCategoryAllResponse = ApiResponse<IApiShopGoodsCategoryAllInfoItem[] | []>;

export interface IApiShopGoodsListV2InfoReq {
  recommendStatus?: number;
  categoryId?: number;
  page?: number;
  pageSize?: number;
  k?: string;
  orderBy?: string;
}
export interface IApiShopGoodsListV2InfoItem {
  afterSale: string;
  categoryId: number;
  cityId: string;
  commission: number;
  commissionSettleType: number;
  commissionType: number;
  commissionUserType: number;
  dateAdd: string;
  dateUpdate: string;
  discountPrice: number;
  districtId: string;
  fxType: number;
  gotScore: number;
  gotScoreType: number;
  hasAddition: boolean;
  hasTourJourney: boolean;
  hidden: number;
  id: number;
  iotControl: boolean;
  kanjia: boolean;
  kanjiaPrice: number;
  limitation: boolean;
  logisticsId: number;
  maxCoupons: number;
  miaosha: boolean;
  minBuyNumber: number;
  minPrice: number;
  minScore: number;
  name: string;
  numberFav: number;
  numberGoodReputation: number;
  numberOrders: number;
  numberReputation: number;
  numberSells: number;
  originalPrice: number;
  overseas: boolean;
  paixu: number;
  persion: number;
  pic: string;
  pingtuan: boolean;
  pingtuanPrice: number;
  priceShopSell: number;
  provinceId: string;
  recommendStatus: number;
  recommendStatusStr: string;
  seckillBuyNumber: number;
  sellEnd: boolean;
  sellStart: boolean;
  shopId: number;
  status: number;
  statusStr: string;
  storeAlert: boolean;
  stores: number;
  stores0Unsale: boolean;
  storesExt1: number;
  storesExt2: number;
  streetId: string;
  tax: number;
  type: number;
  unit: string;
  unusefulNumber: number;
  usefulNumber: number;
  userId: number;
  vetStatus: number;
  views: number;
  weight: number;
  tags: string;
}

export interface IApiShopGoodsListV2InfoData {
  result: IApiShopGoodsListV2InfoItem[];
  totalPage: number;
  totalRow: number;
}

export type IApiShopGoodsListV2Response = ApiResponse<IApiShopGoodsListV2InfoData>;

export interface IApiShopGoodsDetailInfoReq {
  id: number;
  token: string;
}
export interface IApiShopGoodsDetailInfoLogisticsDetail {
  addAmount: number;
  addNumber: number;
  firstAmount: number;
  firstNumber: number;
  type: number;
  userId: number;
}

export interface IApiShopGoodsDetailInfoLogistics {
  details: IApiShopGoodsDetailInfoLogisticsDetail[];
  feeType: number;
  feeTypeStr: string;
  isFree: boolean;
}

export interface IApiShopGoodsDetailInfoPic {
  goodsId: number;
  id: number;
  pic: string;
  userId: number;
}

export interface IApiShopGoodsDetailInfoData {
  basicInfo: IApiShopGoodsListV2InfoItem;
  category: IApiShopGoodsCategoryAllInfoItem;
  content: string;
  extJson: Record<string, any>;
  extJson2: Record<string, any>;
  logistics: IApiShopGoodsDetailInfoLogistics;
  pics: IApiShopGoodsDetailInfoPic[];
  pics2: string[];
  subPics: any[];
  skuList: IApiShopGoodsPriceInfo[];
}

export type IApiShopGoodsDetailResponse = ApiResponse<IApiShopGoodsDetailInfoData>;

export interface IApiShopGoodsPriceInfoReq {
  goodsId: number;
  token: string;
  propertyChildIds: string;
}

export interface IApiShopGoodsPriceInfo {
  fxType: number;
  goodsId: number;
  id: number;
  minBuyNumber: number;
  originalPrice: number;
  pingtuanPrice: number;
  price: number;
  propertyChildIds: string;
  propertyChildNames: string;
  score: number;
  storeAlert: boolean;
  stores: number;
  userId: number;
}

export type IApiShopGoodsPriceResponse = ApiResponse<IApiShopGoodsPriceInfo>;

export interface IApiShopGoodsFavCheckInfoReq {
  goodsId: number;
  token: string;
}
