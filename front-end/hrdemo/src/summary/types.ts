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
    export interface StartedNew extends Base {
        type: 'summary_newStarted'
    }
    export interface Deleted extends Base {
        type: 'summary_deleted',
        id: number
    }
    export interface Navigated extends Base {
        type: 'summary_entered'
    }

    export type Any = StartedNew | Deleted | Navigated
}

export type SideEffects = {
    summary_onCreate: Function,
    summary_onRemove: (id: Actions.Deleted) => void
}