import deepmerge from 'deepmerge'
// import { ecodices } from './ecodices'
// import { getty } from './getty'
// import { harvard } from './harvard'
// import { hsp2 } from './hsp2'
import { maps } from './maps'
import { nga } from './nga'
import { sni } from './sni'
import { gty } from './getty'
import { cambridge } from './cambridge'
import { global } from './global'
// import { ox1 } from './ox'
// import { ubl } from './ubl'
export const collections = deepmerge.all([cambridge, global, gty, maps, nga, sni])
