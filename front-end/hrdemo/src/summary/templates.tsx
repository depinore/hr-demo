import * as React from 'react'
import * as types from './types'

export const Summary = (props: types.State) => (
    <div>
        <h1>This is the summary page.</h1>
        <p>There are {props.employees.length} employees in the database.</p>
        <table>
            {props.employees.map(guy => (
                <tr>
                    <td>{guy.firstName}</td>
                    <td>{guy.lastName}</td>
                </tr>
            ))}
        </table>
    </div>
)