import deepmerge from 'deepmerge'
// import { ecodices } from './ecodices'
import { harvard } from './harvard'
import { maps } from './maps'
import { nga } from './nga'
import { sni } from './sni'
import { gty } from './getty'
import { cambridge } from './cambridge'
import { global } from './global'
// import { ox1 } from './ox'
// import { ubl } from './ubl'
export const collections = deepmerge.all([cambridge, global, gty, harvard, maps, nga, sni])