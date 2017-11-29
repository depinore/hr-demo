import { toCostAnalysis as sharedToCostAnalysis } from '../shared/util'

export function toCostAnalysis(e: DTO.Results.EmployeeDetails) {
    return sharedToCostAnalysis(e.firstName, e.dependents.map(d => d.firstName))
}