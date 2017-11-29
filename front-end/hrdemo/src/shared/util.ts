import * as types from './types'


export function reduceChildren<T extends types.Action>(reducers: types.Reducer<T>[], currentState: Object, action: T) {
    return reducers.reduce((reducedState, fn) => fn(reducedState, action), currentState)
}

export function generateReducer<T extends types.Action>(thisReducer: types.Reducer<T>, childReducers: types.Reducer<any>[]) {
    return function(currentState: Object, action: T) {
        return thisReducer(reduceChildren(childReducers, currentState, action), action)
    }
}

export function getBookends<T>(arr: T[], index: number): { before: T[], after: T[] } {
    return {
        before: arr.slice(0, index),
        after: arr.slice(index + 1)
    }
}

const getCost = (isEmployee: boolean) =>
    isEmployee ? 1000 : 500;

export function toLineItem(firstName: string, appliesTo: 'employee' | number): types.LineItem {
    const isEligibleForDiscount = /^a/i.test(firstName)
    const amount = getCost(appliesTo === 'employee')

    return {
        amount: isEligibleForDiscount ? amount * .9 : amount,
        discounted: isEligibleForDiscount,
        appliesTo: appliesTo
    }
}

export function toCostAnalysis(employeeFirstName: string, dependentFirstNames: string[]): types.CostAnalysis {
    const items: types.LineItem[] = [
        toLineItem(employeeFirstName, 'employee'),
        ...dependentFirstNames.map(toLineItem)
    ]

    return {
        items: items,
        totalCost: items
                    .map(i => i.amount)
                    .reduce((sum, current) => sum + current, 0)
    }
}