import { IConfig } from '../../configuration'

export const gty: IConfig = {
  collections: {
    gty: {
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
      name: 'J. Paul Getty Trust',
      primaryTypeField: 'collections.keyword',
      refinementListFilters: {
        1: {
          field: 'Artist/Maker.keyword',
          label: 'Artist',
          size: 10
        },
        2: {
          field: 'Material.keyword',
          label: 'Material',
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
          field: 'Artist/Maker',
          label: 'Artist',
          type: null
        },
        {
          field: 'Title',
          label: 'Title',
          type: null
        },
        {
          field: 'Dimensions',
          label: 'Dimensions',
          type: null
        },
        {
          field: 'Material',
          label: 'Material',
          type: null
        },
        {
          field: 'Date',
          label: 'Date',
          type: null
        },
        {
          field: 'Accession Number',
          label: 'Accession Number',
          type: null
        },
        {
          field: 'license',
          label: 'License',
          type: null
        },
        {
          field: 'related',
          label: 'Related',
          type: null
        },
        {
          field: 'manifest',
          label: 'Manifest',
          type: null
        },
        {
          field: 'thumbnail',
          label: 'Thumbnail',
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
          field: 'Artist/Maker.keyword',
          label: 'Artist',
          order: 'asc'
        },
        {
          field: 'Date.keyword',
          label: 'Date',
          order: 'asc'
        }
      ]
    }
  }
}
