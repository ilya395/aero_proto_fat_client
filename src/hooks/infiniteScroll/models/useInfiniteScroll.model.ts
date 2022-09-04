export interface IInfiniteScroll {
  callback?: () => void;
  dataLength?: number;
  limit?: number;
}