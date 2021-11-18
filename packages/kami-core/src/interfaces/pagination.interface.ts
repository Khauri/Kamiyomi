export interface Cursor {
  page: number;
  perPage: number;
}

export interface PageInfo<T> {
  hasNextPage: boolean;
  entries: T[];
}