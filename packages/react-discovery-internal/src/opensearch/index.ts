import { IConfig, ISearchField, ISortField } from '../configuration'
import * as enums from './enum'
import * as builders from './query-builders'
import * as state from './state'

export * from './state'
export * from './components'

export const OSCore = {
  builders,
  enums,
  state
}

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

export interface IBucket {
    key: string;
    docCount: number;
}

export interface IAggregation {
    buckets: IBucket[];
}

export interface IAggregations {
    [field: string]: IAggregation;
}

export interface IHit {
    id?: string;
    _id?: string;
    index?: string;
    _source: any;
    highlight?: any;
    highlighting?: any;
    innerHits?: any;
}

export interface IHits {
    hits: IHit[];
    total?: {
        value: number;
    };
    numFound: number;
}

export type IInnerHitField = Record<string, IHits>

export interface IInnerHits {
    'inner_hits': IInnerHitField;
}

export type IDocument = Record<string, IHit>

export interface IResponse {
    aggregations: IAggregations;
    docs?: IDocument;
    error?: {};
    hits: IHits;
    updating?: boolean;
    url: string;
}

export type Succ = any;

export interface IState {
    config: IConfig;
    query: any;
    response: IResponse;
}
