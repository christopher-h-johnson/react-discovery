import { IConfig } from '../../configuration'

export const maps: IConfig = {
  collections: {
    maps: {
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
      name: 'David Rumsey Historical Map Collection',
      primaryTypeField: 'collections.keyword',
      refinementListFilters: {
        1: {
          field: 'Subject.keyword',
          label: 'Subject',
          size: 10
        },
        2: {
          field: 'Type.keyword',
          label: 'Type',
          size: 10
        },
        3: {
          field: 'World Area.keyword',
          label: 'World Area',
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
          field: 'Pub Reference',
          label: 'Pub Reference',
          type: null
        },
        {
          field: 'Pub Date',
          label: 'Pub Date',
          type: null
        },
        {
          field: 'Authors',
          label: 'Authors',
          type: null
        },
        {
          field: 'title',
          label: 'Title',
          type: null
        },
        {
          field: 'Title',
          label: 'Title',
          type: null
        },
        {
          field: 'Obj Width cm',
          label: 'Obj Width cm',
          type: null
        },
        {
          field: 'Obj Height cm',
          label: 'Obj Height cm',
          type: null
        },
        {
          field: 'Pub Note',
          label: 'Pub Note',
          type: null
        },
        {
          field: 'Engraver or Printer',
          label: 'Engraver or Printer',
          type: null
        },
        {
          field: 'List No',
          label: 'List No',
          type: null
        },
        {
          field: 'related',
          label: 'Related',
          type: null
        },
        {
          field: 'World Area',
          label: 'World Area',
          type: null
        },
        {
          field: 'Short Title',
          label: 'Short Title',
          type: null
        },
        {
          field: 'Publisher Location',
          label: 'Publisher Location',
          type: null
        },
        {
          field: 'Full Title',
          label: 'Full Title',
          type: null
        },
        {
          field: 'Pub Maps',
          label: 'Pub Maps',
          type: null
        },
        {
          field: 'Publication Author',
          label: 'Publication Author',
          type: null
        },
        {
          field: 'Download 1',
          label: 'Download 1',
          type: null
        },
        {
          field: 'Download 2',
          label: 'Download 2',
          type: null
        },
        {
          field: 'Publisher',
          label: 'Publisher',
          type: null
        },
        {
          field: 'Date',
          label: 'Date',
          type: null
        },
        {
          field: 'Subject',
          label: 'Subject',
          type: null
        },
        {
          field: 'Pub Title',
          label: 'Pub Title',
          type: null
        },
        {
          field: 'Pub List No',
          label: 'Pub List No',
          type: null
        },
        {
          field: 'Type',
          label: 'Type',
          type: null
        },
        {
          field: 'Note',
          label: 'Note',
          type: null
        },
        {
          field: 'Series No',
          label: 'Series No',
          type: null
        },
        {
          field: 'attribution',
          label: 'Attribution',
          type: null
        },
        {
          field: 'Author',
          label: 'Author',
          type: null
        },
        {
          field: 'Pub Width cm',
          label: 'Pub Width cm',
          type: null
        },
        {
          field: 'Pub Height cm',
          label: 'Pub Height cm',
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
          field: 'Subject.keyword',
          label: 'Subject',
          order: 'asc'
        },
        {
          field: 'Date.keyword',
          label: 'Date',
          order: 'asc'
        },
        {
          field: 'Title.keyword',
          label: 'Title',
          order: 'asc'
        }
      ]
    }
  }
}
