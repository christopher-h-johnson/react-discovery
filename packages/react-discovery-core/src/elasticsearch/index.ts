import * as builders from './query-builders'
import * as enums from './enum'
import * as state from './state'
import { ISearchField, ISortField } from '@react-discovery/configuration'

export const ESCore = {
  builders,
  enums,
  state
}

export * from './components'

export interface IAgg {
  terms: {
    field: string;
    size: number;
  };
}

export type IAggRecord = Record<string, IAgg>

export interface IFetchElasticSearchResponseParams {
  json: string;
  url: string;
}

export interface IFetchElasticSearchDocumentParams {
  url: string;
}

export interface IFilters {
  [field: string]: string[];
}

export interface IElasticSearchQuery {
  aggs: IAggRecord;
  filters: IFilters;
  query?: any;
  searchFields: ISearchField[];
  size: number;
  sortFields: ISortField[];
  from: number;
  stringInput: string;
}

export interface ISearchFunctionRandomQuery {
  aggs: IAggRecord;
  filters: IFilters;
  query?: any;
  searchFields: ISearchField[];
  size: number;
  sortFields: ISortField[];
  from: number;
  stringInput: string;
}
