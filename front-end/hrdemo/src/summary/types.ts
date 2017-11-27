import { Guy } from '../shared/types'

export type SummaryState = {
    guys: Guy[]
}

export const enum Events {
    Select,
    StartNew,
    Delete
}