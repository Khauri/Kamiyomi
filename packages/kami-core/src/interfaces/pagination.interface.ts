export interface Entry {
  id?: string;
}

export interface Cursor {
  page: number;
  perPage: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  entries: Entry[];
}