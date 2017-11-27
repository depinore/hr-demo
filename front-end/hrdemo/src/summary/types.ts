export type State = {
    employees: DTO.Results.EmployeeSummary[]
}

export const enum Events {
    NewStarted,
    Deleted,
}