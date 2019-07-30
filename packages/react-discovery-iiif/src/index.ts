export * from './components'
export * from './SimpleImageViewer'
export * from './IIIFCollectionProvider'
export * from './ImageServices'
export * from './ImageServicesProvider'
export * from './state'

export interface IResponse {
  error?: any;
  responses: {
    imageServices?: imageServices;
  };
  updating: boolean;
}

export interface IImageServices {
  id: string;
  profile: string;
  type: string;
}

export type imageServices = Record<string, IImageServices>

export interface IIIIF {
  apollo?: any;
  collection?: any;
  error?: any;
  responses?: any;
  updating?: boolean;
}