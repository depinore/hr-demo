import * as sharedTypes from '../shared/types'

export type events = 
    | 'details_entered'
    | 'details_saved'
    | 'details_cancelled'
    | 'details_employeeFieldUpdated'
    | 'details_dependentAdded'
    | 'details_dependentRemoved'
    | 'details_dependentFieldUpdated'
    | 'details_formSaveBegin'
    | 'details_formSaveFinish'

export type State = {
    details_formData: DTO.Commands.CreateEmployee
    details_formDisabled: boolean
}

export namespace Actions {
    export interface Base extends sharedTypes.Action {
        type: events
    }
    export interface Simple extends Base {
        type: 'details_entered' 
            | 'details_cancelled' 
            | 'details_dependentAdded' 
            | 'details_formSaveBegin'
    }
    export interface Navigated extends Base {
        type: 'details_entered'
    }
    export interface FormSubmissionFinished extends Base {
        type: 'details_formSaveFinish'
        successful: boolean
    }
    export interface RemovedDependent extends Base {
        type: 'details_dependentRemoved'
        index: number
    }
    export interface FormSaved extends Base {
        type: 'details_saved',
        info: DTO.Commands.CreateEmployee
    }
    export interface UpdatedEmployeeField extends Base {
        type: 'details_employeeFieldUpdated'
        val: string,
        prop: keyof DTO.Commands.Person
    }
    export interface UpdatedDependentField extends Base {
        type: 'details_dependentFieldUpdated',
        val: string,
        prop: keyof DTO.Commands.Person,
        index: number
    }
    export type Any = 
                | Simple 
                | UpdatedDependentField 
                | UpdatedEmployeeField 
                | RemovedDependent
                | FormSaved
                | FormSubmissionFinished
                | Navigated
}

export type SideEffects = {
    details_onEmployeeUpdate: (action: Actions.UpdatedEmployeeField) => void
    details_onDependentUpdate: (action: Actions.UpdatedDependentField) => void
    details_onCancel: () => void
    details_onSave: (action: Actions.FormSaved) => void
    details_onDependentAdd: () => void
    details_onDependentRemove: (action: Actions.RemovedDependent) => void
}