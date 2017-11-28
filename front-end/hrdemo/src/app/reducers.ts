import * as types from './types'
import * as sharedTypes from '../shared/types'
import { generateReducer } from '../shared/util'

import { reduce as summaryReducer } from '../summary/reducers'
import { reduce as detailsReducer } from '../details/reducers'

const childReducers: sharedTypes.Reducer<any>[] = [
    summaryReducer,
    detailsReducer
]

export function beginLoading(s: types.States.Any, a: types.Actions.BeginLoading): types.States.Any {
    return {
        ...s,
        app_summaryLoading: true
    }
}
export function finishLoading(s: types.States.Any, a: types.Actions.FinishLoading): types.States.Any {
    return {
        ...s,
        app_summaryLoading: false
    }
}

export function _reduce(s: types.States.Any, a: types.Actions.Any): types.States.Any {
    switch(a.type) {
        case 'app_beganLoading': 
            return beginLoading(s, a)
        case 'app_loaded': 
            return finishLoading(s, a)
        default: 
            return s
    }
}

export const reduce = generateReducer(_reduce, childReducers)
