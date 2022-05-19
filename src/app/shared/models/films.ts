import {Table} from "../interfaces/table";
import {TableMeta} from "./meta";

export class Film {
  name?: string;
  genre?: string;
  leadStudio?: string;
  audienceScore?: string;
  profitability?: string;
  rottenTomatoes?: string;
  worldwideGross?: string
  year?: string;
}

export class FilmList implements Table {
  data: Film[];
  meta: TableMeta;

  constructor(input: FilmList) {
    this.data = input.data;
    this.meta = input.meta;
  }
}

export class GetFilmsParams {
  page?: number;
  perPage?: number;
  search?: {
    name: string;
  };

  sort?: {
    name?: string;
    genre?: string;
    leadStudio?: string;
    audienceScore?: string;
    profitability?: string;
    rottenTomatoes?: string;
    worldwideGross?: string
    year?: string;
  };

  filters?: {
    genre?: string;
    year?: number[];
  }

  static serialize(params: GetFilmsParams) {
    let request = {
      page: params.page,
      perPage: params.perPage,

      'search[name]': params.search?.name,

      'sort[name]': params.sort?.name,
      'sort[genre]': params.sort?.genre,
      'sort[leadStudio]': params.sort?.leadStudio,
      'sort[audienceScore]': params.sort?.audienceScore,
      'sort[profitability]': params.sort?.profitability,
      'sort[rottenTomatoes]': params.sort?.rottenTomatoes,
      'sort[worldwideGross]': params.sort?.worldwideGross,
      'sort[year]': params.sort?.year,

      'filters[genre]': params.filters?.genre,
      'filters[year]': params.filters?.year,
    };
    Object.keys(request).forEach(key => !request[key] && delete request[key]);
    return request;
  }
}
