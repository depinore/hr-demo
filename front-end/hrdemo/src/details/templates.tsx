import * as React from 'react'

import * as types from './types'

export const Details = (props: types.State & types.SideEffects) => (
    <div>
        <h1>These are the details</h1>
        <form onSubmit={e => {
            e.preventDefault();
            props.details_onSave({
                info: props.details_formData,
                type: 'details_saved'
            })
        }}>
            <div>
                <label>First Name: 
                    <input type='text' value={props.details_formData.employee.firstName} 
                            onChange={(e) => props.details_onEmployeeUpdate({
                                type: 'details_employeeFieldUpdated',
                                prop: 'firstName',
                                val: e.target.value
                            })}/></label>
                <label>Last Name: 
                    <input type='text' value={props.details_formData.employee.lastName} 
                            onChange={(e) => props.details_onEmployeeUpdate({
                                type: 'details_employeeFieldUpdated',
                                prop: 'lastName',
                                val: e.target.value
                            })}/></label>
                <h3>Dependents</h3>
                <ul>
                    {props.details_formData.dependents.map((d, index) => (
                        <li key={index}>
                            <label>First Name
                                <input type='text' value={d.firstName} 
                                    onChange={e => props.details_onDependentUpdate({
                                        type: 'details_dependentFieldUpdated',
                                        index: index,
                                        prop: 'firstName',
                                        val: e.target.value
                                    })}/></label>
                            <label>Last Name
                                <input type='text' value={d.lastName} 
                                    onChange={e => props.details_onDependentUpdate({
                                        type: 'details_dependentFieldUpdated',
                                        index: index,
                                        prop: 'lastName',
                                        val: e.target.value
                                    })}/></label>
                            <button onClick={e => 
                                props.details_onDependentRemove({
                                    type: 'details_dependentRemoved',
                                    index: index
                                })}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button onClick={props.details_onDependentAdd}>Add Dependent</button>
            </div>
            <div>
                <button>Cancel</button>
                <input type='submit' value='Save' />
            </div>
        </form> 
        
    </div>
)