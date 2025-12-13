export interface ICommonListData<T> {
  empty: boolean;
  data: T[][];
  pageNum: number;
  nomore: boolean;
  lowerLoading: boolean;
  refresherTriggered: boolean;
}
