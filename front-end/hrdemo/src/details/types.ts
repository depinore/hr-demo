export const enum Events {
    Saved,
    Cancelled,
    EmployeeFieldUpdated,
    DependentAdded,
    DependentRemoved,
    DependentFieldUpdated
}

export type State = {
    id?: number
    formData: DTO.Commands.CreateEmployee
}
