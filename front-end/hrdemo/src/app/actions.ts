import { Dispatch, AnyAction } from 'redux'
import * as types from './types'

type anyDispatch = Dispatch<AnyAction>

export function requestSummary() {
    return async function(dispatch: anyDispatch) {
        dispatch({
            type: types.Events.SummaryBeganLoading
        })
        var response = await fetch("http://localhost:5000")
        var employees: DTO.Results.EmployeeSummary[] = await response.json();

        return employees
    }
}
export function getSummary() {
    return async function(dispatch: anyDispatch) {
        var e = await requestSummary();
        dispatch({
            type: types.Events.SummaryLoaded,
            employees: e
        })
    }
}