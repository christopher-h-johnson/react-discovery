import { IConfig } from '../../configuration'

export const sni: IConfig = {
  collections: {
    sni: {
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: 'DefaultHitComponent',
          type: 'list'
        },
        {
          expandedView: false,
          hitComponent: 'GridComponent',
          type: 'grid'
        }
      ],
      name: 'Smithsonian Institute',
      primaryTypeField: 'collections.keyword',
      refinementListFilters: {
        1: {
          field: 'Topic.keyword',
          label: 'Topic',
          size: 10
        },
        2: {
          field: 'Type.keyword',
          label: 'Type',
          size: 10
        },
        3: {
          field: 'Date.keyword',
          label: 'Date',
          size: 10
        }
      },
      searchFields: [
        {
          field: '_id',
          label: '_id',
          type: null
        },
        {
          field: 'Title',
          label: 'Title',
          type: null
        },
        {
          field: 'Artist',
          label: 'Artist',
          type: null
        },
        {
          field: 'Provenance',
          label: 'Provenance',
          type: null
        },
        {
          field: 'Period',
          label: 'Period',
          type: null
        },
        {
          field: 'Date',
          label: 'Date',
          type: null
        },
        {
          field: 'Type',
          label: 'Type',
          type: null
        },
        {
          field: 'Medium',
          label: 'Medium',
          type: null
        },
        {
          field: 'Collection',
          label: 'Collection',
          type: null
        },
        {
          field: 'Topic',
          label: 'Topic',
          type: null
        },
        {
          field: 'manifest',
          label: 'manifest',
          type: null
        },
        {
          field: 'thumbnail',
          label: 'thumbnail',
          type: null
        }
      ],
      sortFields: [
        {
          field: 'Title.keyword',
          label: 'Title',
          order: 'asc'
        },
        {
          field: 'Date.keyword',
          label: 'Date',
          order: 'asc'
        },
        {
          field: 'Artist.keyword',
          label: 'Artist',
          order: 'asc'
        }
      ]
    }
  }
}
