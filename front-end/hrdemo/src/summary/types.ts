import * as sharedTypes from '../shared/types'

export type State = {
    summary_employees: DTO.Results.EmployeeSummary[]
}

export type events = 
    | 'summary_newStarted'
    | 'summary_deleted'
    | 'summary_entered'

export namespace Actions {
    export interface Base extends sharedTypes.Action {
        type: events
    }
    export interface StartNew extends Base {
        type: 'summary_newStarted'
    }
    export interface Delete extends Base {
        type: 'summary_deleted',
        id: number
    }

    export type Any = StartNew | Delete
}