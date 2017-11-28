import * as React from 'react'
import * as types from './types'

export const Summary = (props: types.State) => (
    <div>
        <h1>This is the summary page.</h1>
        <p>There are {props.summary_employees.length} employees in the database.</p>
        <table>
            {props.summary_employees.map(employee => (
                <tr>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                </tr>
            ))}
        </table>
    </div>
)