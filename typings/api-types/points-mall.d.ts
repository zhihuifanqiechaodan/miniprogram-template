import { ApiResponse } from '@/typings/api-types/api';
export interface IApiPointsMallGetProductListReq {
  page: number;
  size: number;
  name?: string;
  categoryId?: string;
  status?: string;
  featured?: string;
}
export interface IApiPointsMallGetProductList_list {
  id: string;
  name: string;
  description: string;
  pointsPrice: number;
  stock: number;
  images: string[];
  status: string;
  categoryId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IApiPointsMallGetProductList {
  list: IApiPointsMallGetProductList_list[];
  total: number;
  page: number;
  size: number;
}

export type IApiPointsMallGetProductListRes = ApiResponse<IApiPointsMallGetProductList>;

export interface IApiPointsMallGetUserPointsReq {
  userId: number;
}
export interface IApiPointsMallGetUserPoints {
  points: number;
  userId: number;
}
export type IApiPointsMallGetUserPointsRes = ApiResponse<IApiPointsMallGetUserPoints>;

export interface IApiPointsMallGetOrderListReq {
  page: number;
  size: number;
  status?: 'pending' | 'shipped' | 'completed' | 'cancelled' | '';
  userId: number;
}

// 商品信息接口
export interface IApiPointsMallProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: 'active' | 'inactive';
  featured: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

// 订单项接口
export interface IApiPointsMallOrderItem {
  productId: string;
  quantity: number;
  points: number;
  product: IApiPointsMallProduct;
}

// 物流信息接口
export interface IApiPointsMallShippingInfo {
  trackingNumber: string;
  carrier: string;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  shippedAt: string;
  deliveredAt: string;
  notes: string;
}

// 收货地址接口
export interface IApiPointsMallAddress {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  address: string;
}

// 订单详情接口
export interface IApiPointsMallGetOrderList_list {
  id: string;
  userId: string;
  totalPoints: number;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  statusText: string;
  items: IApiPointsMallOrderItem[];
  shippingInfo: IApiPointsMallShippingInfo;
  address: IApiPointsMallAddress;
  createdAt: string;
  updatedAt: string;
}
export interface IApiPointsMallGetOrderList {
  list: IApiPointsMallGetOrderList_list[];
  total: number;
  page: number;
  size: number;
}
export type IApiPointsMallGetOrderListRes = ApiResponse<IApiPointsMallGetOrderList>;

export interface IApiPointsMallGetOrderDetailReq {
  orderId: string;
}
export type IApiPointsMallGetOrderDetailRes = ApiResponse<IApiPointsMallGetOrderList_list>;

export interface IApiPointsMallConfirmReceiptReq {
  orderId: string;
  userId: number;
}
export interface IApiPointsMallConfirmReceipt {
  orderId: string;
  status: string;
  statusText: string;
}
export type IApiPointsMallConfirmReceiptRes = ApiResponse<IApiPointsMallConfirmReceipt>;

export interface IApiPointsMallGetUserPointsTransactionsReq {
  userId: number;
  page: number;
  size: number;
}

// 积分交易记录接口
export interface IApiPointsMallPointsTransaction {
  id: string;
  userId: string;
  points: number;
  balance: number;
  type: 'redeem' | 'admin_adjust' | 'sign_in';
  sourceId: string | null;
  sourceType: string;
  description: string;
  expireAt: string;
  metadata: {
    orderItems?: number;
    streakCount?: number;
  };
  createdAt: string;
  createdBy: string;
}

export interface IApiPointsMallGetUserPointsTransactions {
  list: IApiPointsMallPointsTransaction[];
  total: number;
  page: number;
  size: number;
}

export type IApiPointsMallGetUserPointsTransactionsRes = ApiResponse<IApiPointsMallGetUserPointsTransactions>;

export interface IApiPointsMallGetProductDetailReq {
  productId: number;
}
export interface IApiPointsMallGetProductDetail {
  id: string;
  name: string;
  description: string;
  detail: string;
  pointsPrice: number;
  stock: number;
  images: string[];
  status: string;
  categoryId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
export type IApiPointsMallGetProductDetailRes = ApiResponse<IApiPointsMallGetProductDetail>;

export interface IApiPointsMallCreateOrderReq {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: IApiPointsMallAddress;
  userId: number;
}
export interface IApiPointsMallCreateOrder {
  id: string;
  userId: string;
  totalPoints: number;
  status: string;
  statusText: string;
}
export type IApiPointsMallCreateOrderRes = ApiResponse<IApiPointsMallCreateOrder>;

export interface IApiPointsMallGetUserSignInHistoryReq {
  userId: string;
  startDate: string;
  endDate: string;
}

export interface IApiPointsMallGetUserSignInHistoryList {
  time: string;
  signStatus: string;
}
export interface IApiPointsMallGetUserSignInHistory {
  totalSignCount: number;
  list: IApiPointsMallGetUserSignInHistoryList[];
}
export type IApiPointsMallGetUserSignInHistoryRes = ApiResponse<IApiPointsMallGetUserSignInHistory>;

export interface IApiPointsMallIsTodaySignedInReq {
  userId: number;
}
export interface IApiPointsMallIsTodaySignedIn {
  isSignedIn: boolean;
}
export type IApiPointsMallIsTodaySignedInRes = ApiResponse<IApiPointsMallIsTodaySignedIn>;

export interface IApiPointsMallSignInReq {
  userId: number;
}
export interface IApiPointsMallSignIn {
  streakCount: number;
  points: number;
  message: string;
}
export type IApiPointsMallSignInRes = ApiResponse<IApiPointsMallSignIn>;

export interface IApiPointsMallAddPointsReq {
  userId: string;
  points: number;
  type: string;
  description: string;
}
export interface IApiPointsMallAddPoints {
  points: number;
  message: string;
}
export type IApiPointsMallAddPointsRes = ApiResponse<IApiPointsMallAddPoints>;

export interface IApiPointsMallTaskCompleteReq {
  taskType: string;
  taskId: string;
  userId: string;
  startTime: number;
  endTime: number;
}

export interface IApiPointsMallTaskComplete {
  points: number;
  message: string;
}

export type IApiPointsMallTaskCompleteRes = ApiResponse<IApiPointsMallTaskComplete>;

export interface IApiPointsMallGetDailyTaskCompletionsReq {
  userId: string;
  date: string;
}

export interface IApiPointsMallDailyTaskItem {
  id: string;
  taskType: string;
  taskName: string;
  description: string;
  points: number;
  completed: boolean;
  completedAt?: string;
}

export interface IApiPointsMallGetDailyTaskCompletions {
  date: string;
  tasks: IApiPointsMallDailyTaskItem[];
  totalPoints: number;
  totalTasks: number;
}
export type IApiPointsMallGetDailyTaskCompletionsRes = ApiResponse<IApiPointsMallGetDailyTaskCompletions>;
