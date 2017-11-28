export type Action = {
    type: string
}
export type Reducer<TAction extends Action> = {
    (currentState: any, action: TAction): any
}