export * from './actions'
export * from './reducers'

// export interface IResponse {
//     error?: any;
//     responses: {
//         imageServices?: imageServices;
//     };
//     updating: boolean;
// }

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
