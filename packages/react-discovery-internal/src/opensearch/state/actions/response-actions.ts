import { encode } from 'base-64'
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { IFetchElasticSearchDocumentParams, IFetchElasticSearchResponseParams, IState, Succ } from '../../'

const create = actionCreatorFactory()
const FETCH_ELASTICSEARCH_RESPONSE = 'FETCH_ELASTICSEARCH_RESPONSE'
const FETCH_ELASTICSEARCH_DOCUMENT = 'FETCH_ELASTICSEARCH_DOCUMENT'
const SET_RESPONSE_ERROR = 'SET_RESPONSE_ERROR'
const createAsync = asyncFactory<IState>(create)
export const setResponseError = create<{error: string}>(SET_RESPONSE_ERROR)
const username = process.env.REACT_APP_SEARCH_API_USERNAME
const password = process.env.REACT_APP_SEARCH_API_PASSWORD
const encoded = encode(username + ':' + password)

export const fetchElasticSearchResponse = createAsync<IFetchElasticSearchResponseParams, Succ>(FETCH_ELASTICSEARCH_RESPONSE,
  async (params: IFetchElasticSearchResponseParams): Promise<string> => {
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Basic ' + encoded)
      // eslint-disable-next-line no-undef
      const cache: RequestCache = 'default'
      // eslint-disable-next-line no-undef
      const mode: RequestMode = 'cors'
      const init = {
        body: params.json,
        cache,
        headers,
        method: 'POST',
        mode
      }
      const request = new Request(params.url, init)
      const res = await fetch(request)
      if (!res.ok) {
        setResponseError({ error: `${res.status}: ${res.statusText} ${await res.text()}` })
      }
      return res.json()
    } catch (e) {
      setResponseError({ error: e })
    }
  }
)

export const fetchElasticSearchDocument = createAsync<IFetchElasticSearchDocumentParams, Succ>(FETCH_ELASTICSEARCH_DOCUMENT,
  async (params: IFetchElasticSearchDocumentParams): Promise<string> => {
    try {
      const headers = new Headers()
      const username = process.env.REACT_APP_SEARCH_API_USERNAME
      const password = process.env.REACT_APP_SEARCH_API_PASSWORD
      const encoded = encode(username + ':' + password)
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Basic ' + encoded)
      // eslint-disable-next-line no-undef
      const cache: RequestCache = 'default'
      // eslint-disable-next-line no-undef
      const mode: RequestMode = 'cors'
      const init = {
        cache,
        headers,
        method: 'GET',
        mode
      }
      const request = new Request(params.url, init)
      const res = await fetch(request)
      if (!res.ok) {
        setResponseError({ error: `${res.status}: ${res.statusText} ${await res.text()}` })
      }
      return res.json()
    } catch (e) {
      setResponseError({ error: e })
    }
  }
)
