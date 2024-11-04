import { IConfig } from '../../configuration'

export const global: IConfig = {
  collections: {
    global: {
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
      name: 'Global Collection (WIP)',
      primaryTypeField: 'collections.keyword',
      refinementListFilters: {
        1: {
          field: 'Subject(s).keyword',
          label: 'Subject',
          size: 10
        },
        2: {
          field: 'Format.keyword',
          label: 'Format',
          size: 10
        },
        3: {
          field: 'Material.keyword',
          label: 'Material',
          size: 10
        },
        4: {
          field: 'Artist.keyword',
          label: 'Artist',
          size: 10
        },
        5: {
          field: 'Type.keyword',
          label: 'Type',
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
          field: 'Abstract',
          label: 'Abstract',
          type: null
        },
        {
          field: 'Accession Number',
          label: 'Accession Number',
          type: null
        },
        {
          field: 'Access Note / Rights',
          label: 'Access Note / Rights',
          type: null
        },
        {
          field: 'Accession Number',
          label: 'Accession Number',
          type: null
        },
        {
          field: 'Accompanying Material',
          label: 'Accompanying Material',
          type: null
        },
        {
          field: 'Acquisition',
          label: 'Acquisition',
          type: null
        },
        {
          field: 'Additional Forms',
          label: 'Additional Forms',
          type: null
        },
        {
          field: 'Additions',
          label: 'Additions',
          type: null
        },
        {
          field: 'Alternative Title(s)',
          label: 'Alternative Title(s)',
          type: null
        },
        {
          field: 'Arrangement',
          label: 'Arrangement',
          type: null
        },
        {
          field: 'Artist',
          label: 'Artist',
          type: null
        },
        {
          field: 'Artist / Maker',
          label: 'Artist / Maker',
          type: null
        },
        {
          field: 'Artists',
          label: 'Artists',
          type: null
        },
        {
          field: 'Associated Date',
          label: 'Associated Date',
          type: null
        },
        {
          field: 'Associated Name(s)',
          label: 'Associated Name(s)',
          type: null
        },
        {
          field: 'Associated Person(s)',
          label: 'Associated Person(s)',
          type: null
        },
        {
          field: 'Associated Place',
          label: 'Associated Place',
          type: null
        },
        {
          field: 'Associated Place(s)',
          label: 'Associated Place(s)',
          type: null
        },
        {
          field: 'Associated Organisation(s)',
          label: 'Associated Organisation(s)',
          type: null
        },
        {
          field: 'Attributed Author',
          label: 'Attributed Author',
          type: null
        },
        {
          field: 'attribution',
          label: 'Attribution',
          type: null
        },
        {
          field: 'Attribution',
          label: 'Attribution',
          type: null
        },
        {
          field: 'Author',
          label: 'Author',
          type: null
        },
        {
          field: 'Author(s)',
          label: 'Author(s)',
          type: null
        },
        {
          field: 'Authors',
          label: 'Authors',
          type: null
        },
        {
          field: 'Author(s) of the Record',
          label: 'Author(s) of the Record',
          type: null
        },
        {
          field: 'Bibliography',
          label: 'Bibliography',
          type: null
        },
        {
          field: 'Binding',
          label: 'Binding',
          type: null
        },
        {
          field: 'Caption',
          label: 'Caption',
          type: null
        },
        {
          field: 'Category',
          label: 'Category',
          type: null
        },
        {
          field: 'City',
          label: 'City',
          type: null
        },
        {
          field: 'Classmark',
          label: 'Classmark',
          type: null
        },
        {
          field: 'Collation',
          label: 'Collation',
          type: null
        },
        {
          field: 'Collection',
          label: 'Collection',
          type: null
        },
        {
          field: 'Condition',
          label: 'Condition',
          type: null
        },
        {
          field: 'Country',
          label: 'Country',
          type: null
        },
        {
          field: 'Created by',
          label: 'Created by',
          type: null
        },
        {
          field: 'Creation Year',
          label: 'Creation Year',
          type: null
        },
        {
          field: 'Creator',
          label: 'Creator',
          type: null
        },
        {
          field: 'Creator(s)',
          label: 'Creator(s)',
          type: null
        },
        {
          field: 'Data Source(s)',
          label: 'Data Source(s)',
          type: null
        },
        {
          field: 'Date',
          label: 'Date',
          type: null
        },
        {
          field: 'Date of Acquisition',
          label: 'Date of Acquisition',
          type: null
        },
        {
          field: 'Date of Creation',
          label: 'Date of Creation',
          type: null
        },
        {
          field: 'Date of Publication',
          label: 'Date of Publication',
          type: null
        },
        {
          field: 'Decoration',
          label: 'Decoration',
          type: null
        },
        {
          field: 'Description',
          label: 'Description',
          type: null
        },
        {
          field: 'description',
          label: 'Description',
          type: null
        },
        {
          field: 'Descriptive Title(s)',
          label: 'Descriptive Title(s)',
          type: null
        },
        {
          field: 'Donor(s)',
          label: 'Donor(s)',
          type: null
        },
        {
          field: 'Excerpts',
          label: 'Excerpts',
          type: null
        },
        {
          field: 'Extent',
          label: 'Extent',
          type: null
        },
        {
          field: 'Featured in',
          label: 'Featured in',
          type: null
        },
        {
          field: 'Filiations',
          label: 'Filiations',
          type: null
        },
        {
          field: 'Foliation',
          label: 'Foliation',
          type: null
        },
        {
          field: 'Format',
          label: 'Format',
          type: null
        },
        {
          field: 'Former Owner(s)',
          label: 'Former Owner(s)',
          type: null
        },
        {
          field: 'Full Title',
          label: 'Full Title',
          type: null
        },
        {
          field: 'Funding',
          label: 'Funding',
          type: null
        },
        {
          field: 'Inscription',
          label: 'Inscription',
          type: null
        },
        {
          field: 'Inscriptions',
          label: 'Inscriptions',
          type: null
        },
        {
          field: 'Language(s)',
          label: 'Language(s)',
          type: null
        },
        {
          field: 'Layout',
          label: 'Layout',
          type: null
        },
        {
          field: 'Location',
          label: 'Location',
          type: null
        },
        {
          field: 'Level of Description',
          label: 'Level of Description',
          type: null
        },
        {
          field: 'Manifest',
          label: 'Manifest',
          type: null
        },
        {
          field: 'Material',
          label: 'Material',
          type: null
        },
        {
          field: 'Medium',
          label: 'Medium',
          type: null
        },
        {
          field: 'Music notation',
          label: 'Music notation',
          type: null
        },
        {
          field: 'Note',
          label: 'Note',
          type: null
        },
        {
          field: 'Notes',
          label: 'Notes',
          type: null
        },
        {
          field: 'Note(s)',
          label: 'Note(s)',
          type: null
        },
        {
          field: 'Origin',
          label: 'Origin',
          type: null
        },
        {
          field: 'Original artist',
          label: 'Original artist',
          type: null
        },
        {
          field: 'Origin Place',
          label: 'Origin Place',
          type: null
        },
        {
          field: 'Painter',
          label: 'Painter',
          type: null
        },
        {
          field: 'Physical Description',
          label: 'Physical Description',
          type: null
        },
        {
          field: 'Physical Location',
          label: 'Physical Location',
          type: null
        },
        {
          field: 'Place',
          label: 'Place',
          type: null
        },
        {
          field: 'Place made',
          label: 'Place made',
          type: null
        },
        {
          field: 'Place of Publication',
          label: 'Place of Publication',
          type: null
        },
        {
          field: 'Primary Title',
          label: 'Primary Title',
          type: null
        },
        {
          field: 'Provenance',
          label: 'Provenance',
          type: null
        },
        {
          field: 'Pub Date',
          label: 'Pub Date',
          type: null
        },
        {
          field: 'Publisher',
          label: 'Publisher',
          type: null
        },
        {
          field: 'Recipient(s)',
          label: 'Recipient(s)',
          type: null
        },
        {
          field: 'Region',
          label: 'Region',
          type: null
        },
        {
          field: 'Scribe(s)',
          label: 'Scribe(s)',
          type: null
        },
        {
          field: 'Script',
          label: 'Script',
          type: null
        },
        {
          field: 'seeAlso',
          label: 'seeAlso',
          type: null
        },
        {
          field: 'Style',
          label: 'Style',
          type: null
        },
        {
          field: 'Subject',
          label: 'Subject',
          type: null
        },
        {
          field: 'Subject(s)',
          label: 'Subject(s)',
          type: null
        },
        {
          field: 'Support',
          label: 'Support',
          type: null
        },
        {
          field: 'thumbnail',
          label: 'thumbnail',
          type: null
        },
        {
          field: 'title',
          label: 'title',
          type: null
        },
        {
          field: 'Title',
          label: 'Title',
          type: null
        },
        {
          field: 'Topic',
          label: 'Topic',
          type: null
        },
        {
          field: 'Type',
          label: 'Type',
          type: null
        },
        {
          field: 'Uniform Title',
          label: 'Uniform Title',
          type: null
        },
        {
          field: 'World Area',
          label: 'World Area',
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
          field: 'Author(s).keyword',
          label: 'Author(s)',
          order: 'asc'
        },
        {
          field: 'Subject(s).keyword',
          label: 'Subject(s)',
          order: 'desc'
        }
      ]
    }
  }
}
