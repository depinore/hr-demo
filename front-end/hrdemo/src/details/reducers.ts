import * as sharedTypes from '../shared/types'
import { generateReducer, getBookends } from '../shared/util'
import * as types from './types'

const childReducers: sharedTypes.Reducer<any>[] = []

export function initializeFormData(s: types.State): types.State {
    return {
        ...s,
        details_formData: {
            employee: {
                firstName: '',
                lastName: ''
            },
            dependents: []
        }
    }
}

export function updateEmployeeField(s: types.State, a: types.Actions.UpdateEmployeeField): types.State {
    return {
        ...s,
        details_formData: {
            ...s.details_formData,
            [a.prop]: a.val
        }
    }
}
export function updateDependentField(s: types.State, a: types.Actions.UpdateDependentField): types.State {
    const bookEnds = getBookends(s.details_formData.dependents, a.index)

    return {
        ...s,
        details_formData: {
            ...s.details_formData,
            dependents: [
                ...bookEnds.before, 
                {
                    ...s.details_formData.dependents[a.index],
                    [a.prop]: a.val
                }, 
                ...bookEnds.after
            ]
        }
    }
}

export function addDependent(s: types.State): types.State {
    return {
        ...s,
        details_formData: {
            ...s.details_formData,
            dependents: [
                ...s.details_formData.dependents,
                { firstName: '', lastName: '' }
            ]
        }
    }
}
export function removeDependent(s: types.State, a: types.Actions.RemoveDependent): types.State {
    const bookends = getBookends(s.details_formData.dependents, a.index)
    return {
        ...s,
        details_formData: {
            ...s.details_formData,
            dependents: [...bookends.before, ...bookends.after]
        }
    }
}

export function _reduce(s: types.State, a: types.Actions.Any): types.State {
    switch(a.type) {
        case 'details_dependentAdded':
            return addDependent(s)        
        case 'details_dependentRemoved':
            return removeDependent(s, a)
        case 'details_employeeFieldUpdated':
            return updateEmployeeField(s, a)
        case 'details_dependentFieldUpdated':
            return updateDependentField(s, a)
        case 'details_entered':
        case 'details_saved':
        case 'details_cancelled':
        default: 
            return s;
    }
}

export const reduce = generateReducer(_reduce, childReducers)