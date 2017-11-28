import * as sharedTypes from '../shared/types'
import { generateReducer } from '../shared/util'
import * as types from './types'

const childReducers: sharedTypes.Reducer<any>[] = []

export function deleteEmployee(s: types.State, a: types.Actions.Delete): types.State {
    return {
        ...s,
        summary_employees: s.summary_employees.filter(e => e.id !== a.id)
    }
}

export const reduce = generateReducer(function(s: types.State, a: types.Actions.Any) {
    switch(a.type) {
        case 'summary_deleted':
            return deleteEmployee(s, a)
        case 'summary_newStarted': //summary_new started does not trigger any state changes from this level.
        default:
            return s
    }
}, childReducers)