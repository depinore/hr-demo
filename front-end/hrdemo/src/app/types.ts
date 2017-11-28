import * as detailsTypes from '../details/types'
import * as summaryTypes from '../summary/types'
import * as sharedTypes from '../shared/types'

export type events = 
    | 'app_beganLoading'
    | 'app_loaded'

export type views = 'details' | 'summary'

export namespace States {
    export interface Base extends summaryTypes.State {
        app_currentView: views,
        app_summaryLoading: boolean
    }
    export type Summary = Base & { app_currentView: 'summary' }
    export type Details = Base & { app_currentView: 'details' } & detailsTypes.State
    export type Any = Summary | Details
}

export namespace Actions {
    export interface Base extends sharedTypes.Action {
        type: events,
    }
    export interface BeginLoading extends Base {
        type: 'app_beganLoading',
    }
    export interface FinishLoading extends Base {
        type: 'app_loaded'
        employees: DTO.Results.EmployeeSummary[]
    }

    export type Any = BeginLoading | FinishLoading
}