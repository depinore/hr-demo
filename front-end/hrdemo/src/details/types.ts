import * as sharedTypes from '../shared/types'

export type DetailsState = {
    guy: sharedTypes.Guy
}
export const enum Events {
    Save,
    Cancel,
    Submit,
    FormUpdate
}