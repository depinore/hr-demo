import * as React from 'react'

import * as types from './types'

export const Summary = (props: types.SummaryState) => (
    <div>
        <h1>This is the summary page.</h1>
        <p>There are {props.guys.length} guys in the database.</p>
        <table>
            {props.guys.map(guy => (
                <tr>
                    <td>{guy.firstName}</td>
                    <td>{guy.lastName}</td>
                </tr>
            ))}
        </table>
    </div>
)