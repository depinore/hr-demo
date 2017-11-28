import * as types from './types'


export function reduceChildren<T extends types.Action>(reducers: types.Reducer<T>[], currentState: Object, action: T) {
    return reducers.reduce((reducedState, fn) => fn(reducedState, action), currentState)
}

export function generateReducer<T extends types.Action>(thisReducer: types.Reducer<T>, childReducers: types.Reducer<any>[]) {
    return function(currentState: Object, action: T) {
        return thisReducer(reduceChildren(childReducers, currentState, action), action)
    }
}

export function getBookends<T>(arr: T[], index: number): { before: T[], after: T[] } {
    return {
        before: arr.slice(0, index),
        after: arr.slice(index + 1)
    }
}