import * as React from 'react'

import * as types from './types'

export const Details = (props: types.DetailsState) => (
    <div>
        <h1>These are the details</h1>
        <p>
            <span>FirstName: ${props.guy.firstName}</span><br />
            <span>LastName: ${props.guy.lastName}</span>
        </p> 
    </div>
)