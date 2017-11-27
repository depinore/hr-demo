import * as sharedTypes from '../shared/types'
import * as detailsTypes from '../details/types'
import * as summaryTypes from '../summary/types'

export type AppState = {
    currentView: 'details' | 'summary'
    summary: sharedTypes.Eventual<summaryTypes.State>
    details?: sharedTypes.Eventual<detailsTypes.State>
}

export const enum Events {
    SummaryBeganLoading,
    SummaryLoaded
}