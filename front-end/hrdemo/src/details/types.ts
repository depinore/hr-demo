import * as sharedTypes from '../shared/types'

export type events = 
    | 'details_entered'
    | 'details_saved'
    | 'details_cancelled'
    | 'details_employeeFieldUpdated'
    | 'details_dependentAdded'
    | 'details_dependentRemoved'
    | 'details_dependentFieldUpdated'

export type State = {
    details_formData: DTO.Commands.CreateEmployee
}

export namespace Actions {
    export interface Base extends sharedTypes.Action {
        type: events
    }
    export interface Simple extends Base {
        type: 'details_entered' 
            | 'details_saved' 
            | 'details_cancelled' 
            | 'details_dependentAdded' 
    }
    export interface RemoveDependent extends Base {
        type: 'details_dependentRemoved'
        index: number
    }
    export interface UpdateEmployeeField extends Base {
        type: 'details_employeeFieldUpdated'
        val: string,
        prop: keyof DTO.Commands.Person
    }
    export interface UpdateDependentField extends Base {
        type: 'details_dependentFieldUpdated',
        val: string,
        prop: keyof DTO.Commands.Person,
        index: number
    }
    export type Any = Simple | UpdateDependentField | UpdateEmployeeField | RemoveDependent
}