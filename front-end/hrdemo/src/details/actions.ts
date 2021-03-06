import * as types from './types'

export async function saveForm(dispatch: Function, cmd: types.Actions.FormSaved) {
    dispatch(<types.Actions.Simple>{
        type: 'details_formSaveBegin'
    })

    const submission = await fetch(new Request('http://localhost:5000/employees', {
        body: JSON.stringify(cmd.info),
        method: 'POST',
        mode: 'cors'
    }))
    const results: types.Actions.FormSubmissionFinished = {
        type: 'details_formSaveFinish',
        successful: submission.ok
    }
    dispatch(results)

    return results;
}