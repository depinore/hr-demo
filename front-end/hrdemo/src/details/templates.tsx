import * as React from 'react'

import * as types from './types'
import * as sharedTypes from '../shared/types'
import { preDeductionSalary } from '../shared/constants'
import { toCostAnalysis } from './util'

export const Person = (props: { formInfo: DTO.Commands.CreateEmployee, identifier: 'employee' | number }) => {
    const p: DTO.Results.Person = props.identifier === 'employee' ? props.formInfo.employee : props.formInfo.dependents[props.identifier]

    return (
        <span>{props.identifier === 'employee' ? 'Employee' : 'Dependent'} {p.firstName} {p.lastName} &nbsp;</span>
    )
}
export const Price = (props: { lineItem: sharedTypes.LineItem }) =>
    <span>- ${props.lineItem.amount} {props.lineItem.discounted ? '(discounted)' : ''}</span>

export const LineItem = (props: { formInfo: DTO.Commands.CreateEmployee, lineItem: sharedTypes.LineItem }) => (
    <div>
        <Person formInfo={props.formInfo} identifier={props.lineItem.appliesTo} />
        <Price lineItem={props.lineItem} />
    </div>
)
export function EmployeeName(props: { employee: DTO.Commands.Person }) {
    const fullName = (props.employee.firstName + ' ' + props.employee.lastName).trim()

    return <h1>{fullName || 'New Employee'}</h1>
}

export function Details(props: types.State & types.SideEffects) {
    const costAnalysis = toCostAnalysis(props.details_formData)

    return (
        <div>
            <EmployeeName employee={props.details_formData.employee} />
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
                                <input type='button' onClick={e => 
                                    props.details_onDependentRemove({
                                        type: 'details_dependentRemoved',
                                        index: index
                                    })} value='Remove' />
                            </li>
                        ))}
                    </ul>
                    <input type='button' onClick={props.details_onDependentAdd} value='Add Dependent' />
                </div>
                <h2>Cost Analysis Breakdown</h2>
                <p><strong>Pre-deduction salary:</strong> ${preDeductionSalary}</p>
                <h3>Deductions</h3>
                <ul>
                    {
                        costAnalysis.items.map((item, index) => 
                            <li key={index}>
                                <LineItem formInfo={props.details_formData} lineItem={item} />
                            </li>
                    )}
                </ul>
                <p><strong>Total Deductions:</strong> ${costAnalysis.totalCost}</p>
                <p><strong>Post-deduction salary:</strong> ${preDeductionSalary - costAnalysis.totalCost}</p>
                <div>
                    <input type='button' value='Cancel' onClick={props.details_onCancel}/>
                    <input type='submit' value='Save' />
                </div>
            </form> 
        </div>
    )
}