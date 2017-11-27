import * as React from 'react'

import * as types from './types'

export const Details = (props: types.State) => (
    <div>
        <h1>These are the details</h1>
        <p>
            <span>FirstName: ${props.formData.employee.firstName}</span><br />
            <span>LastName: ${props.formData.employee.lastName}</span>
            {props.formData.dependents.map(d => (
                <div>
                    <label>First Name<input type='text' value={d.firstName} /></label>
                    <label>Last Name<input type='text' value={d.lastName} /></label>
                </div>
            ))}
        </p> 
    </div>
)