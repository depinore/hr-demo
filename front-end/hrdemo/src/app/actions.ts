import * as types from './types'
import * as summaryTypes from '../summary/types'
import * as detailsTypes from '../details/types'
import * as detailsActions from '../details/actions'

import * as summaryActions from '../summary/actions'

export async function getEmployees(dispatch: Function) {
    const beginLoading: types.Actions.BeganLoading = { type: 'app_beganLoading' }

    dispatch(beginLoading)

    const finishedLoading: types.Actions.FinishedLoading = {
        type: 'app_loaded',
        employees: await (await fetch('http://localhost:5000/employees')).json()
    }
    dispatch(finishedLoading);
}

export function generateSummarySideEffects(dispatch: (x: any) => void): summaryTypes.SideEffects {
    return {
        summary_onCreate: () => dispatch(<detailsTypes.Actions.Navigated>{
            type: 'details_entered'
        }),
        summary_onRemove: (action: summaryTypes.Actions.Deleted) => 
            summaryActions.deleteEmployees(action, dispatch)
    }
}
export function generateDetailsSideEffects(dispatch: (x: any) => void): detailsTypes.SideEffects {
    return {
        details_onCancel: () => dispatch(<detailsTypes.Actions.Simple>{
            type: 'details_cancelled'
        }),
        details_onDependentAdd: () => dispatch(<detailsTypes.Actions.Simple>{
            type: 'details_dependentAdded'
        }),
        details_onSave: async function(action: detailsTypes.Actions.FormSaved) {
            const results = await detailsActions.saveForm(dispatch, action)
            if(results.successful)
                dispatch(<detailsTypes.Actions.Navigated>{
                    type: 'details_entered'
                })
        },
        details_onDependentRemove: dispatch,
        details_onDependentUpdate: dispatch,
        details_onEmployeeUpdate: dispatch
    }
}