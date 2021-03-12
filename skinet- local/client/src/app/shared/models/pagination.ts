import { Proizvod } from './proizvod';

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Proizvod[];
}

export class Paginations implements Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Proizvod[] = [];
}
