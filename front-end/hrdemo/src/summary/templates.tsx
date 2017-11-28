import * as React from 'react'
import * as types from './types'

export const Summary = (props: types.State & types.SideEffects) => (
    <div>
        <h1>This is the summary page.</h1>
        <p>There are {props.summary_employees.length} employees in the database.</p>
        <button onClick={() => props.summary_onCreate()}>NEW</button>
        <table>
            <tbody>
                {props.summary_employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>
                            <button 
                                onClick={() => props.summary_onRemove({
                                    id: employee.id,
                                    type: 'summary_deleted' 
                                })}>DELETE</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)