import { toCostAnalysis as sharedToCostAnalysis } from '../shared/util'

export function toCostAnalysis(formInfo: DTO.Commands.CreateEmployee) {
    return sharedToCostAnalysis(formInfo.employee.firstName, 
        formInfo.dependents.map(d => d.firstName))
}