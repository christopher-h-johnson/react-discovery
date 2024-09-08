import { IConfig } from '../configuration'
import deepmerge from 'deepmerge'
import { collections } from './collections'

const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION
export const rootConfig: IConfig = {
  collections: {},
  currentCollection,
  currentLanguage: 'en',
  itemViews: {},
  languages: [
    {
      label: 'Deutsch',
      locale: 'de'
    },
    {
      label: 'English',
      locale: 'en'
    }],
  rootContext: '/search',
  selectedIndex: 0,
  viewType: 'grid'
}

export const localConfig: any = deepmerge(rootConfig, collections)
