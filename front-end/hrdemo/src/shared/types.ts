export type Action = {
    type: string
}
export type Reducer<TAction extends Action> = {
    (currentState: any, action: TAction): any
}

export type LineItem = {
    discounted: boolean
    appliesTo: 'employee' | number //if it's a number, it's referring to a dependent index.
    amount: number
}

export type CostAnalysis = {
    items: LineItem[]
    totalCost: number;
}