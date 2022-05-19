export class TableMeta {
  page: number;
  perPage: number;
  from: number;
  to: number;
  total: number;
  totalPages: number;

  constructor(input: TableMeta) {
    this.page = input.page;
    this.perPage = input.perPage;
    this.from = input.from;
    this.to = input.to;
    this.total = input.total;
    this.totalPages = input.totalPages;
  }
}
