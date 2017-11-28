import * as types from './types'

export async function deleteEmployees(action: types.Actions.Deleted, dispatch: Function) {
    dispatch(action)

    const request = new Request(`http://localhost:5000/employees/${action.id}`, {
        method: 'DELETE',
    })
    await fetch(request);
}