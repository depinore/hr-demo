import * as types from './types'
import * as sharedTypes from '../shared/types'
import { generateReducer } from '../shared/util'

import { reduce as summaryReducer } from '../summary/reducers'
import { reduce as detailsReducer } from '../details/reducers'
import * as summaryTypes from '../summary/types'
import * as detailsTypes from '../details/types'

const childReducers: sharedTypes.Reducer<any>[] = [
    summaryReducer,
    detailsReducer
]

export function beginLoading(s: types.States.Any, a: types.Actions.BeganLoading): types.States.Any {
    return {
        ...s,
        app_summaryLoading: true
    }
}
export function finishLoading(s: types.States.Any, a: types.Actions.FinishedLoading): types.States.Any {
    return {
        ...s,
        app_summaryLoading: false,
        summary_employees: a.employees
    }
}
export function navigateToDetails(s: any): types.States.Any {
    return { 
        ...s, 
        app_currentView: 'details' 
    }
}
export function navigateToSummary(s: any): types.States.Any {
    return { 
        ...s, 
        app_currentView: 'summary' 
    }
}

export function _reduce(s: types.States.Any, a: types.Actions.Any | detailsTypes.Actions.Base | summaryTypes.Actions.Base): types.States.Any {
    switch(a.type) {
        case 'app_beganLoading': 
            return beginLoading(s, a)
        case 'app_loaded': 
            return finishLoading(s, a)
        case 'details_entered':
            return navigateToDetails(s)
        case 'summary_entered':
            return navigateToSummary(s)
        //intercept child actions and trigger secondary behaviors from the top-level
        default: 
            return s
    }
}

export const reduce = generateReducer(_reduce, childReducers)
