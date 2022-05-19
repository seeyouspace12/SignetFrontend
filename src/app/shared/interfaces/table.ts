import {TableMeta} from "../models/meta";

export interface Table {
  data: any[];
  meta: TableMeta;
}

export interface PeriodicElement {
  name: string;
  genre: string;
  leadStudio: string;
  audienceScore: string;
  profitability: string;
  rottenTomatoes: string;
  worldwideGross: string;
  year: number;
}
