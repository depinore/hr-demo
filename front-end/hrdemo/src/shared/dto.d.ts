//these are DTO files that will be used to interact with the back-end APIs.
//I had originally intended to auto-generate these, but doing so without also installing Visual Studio has proven to be very difficult.
//Currently, these are being hand-written.

declare namespace DTO {
    export namespace Commands {
        export interface Person {
            firstName: string
            lastName: string
        }
        export interface CreateEmployee {
            employee: Person
            dependents: Person[]
        }
        export interface DeleteEmployee {
            id: number
        }
    }
    export namespace Queries {
        export interface FindEmployee {
            id: number
        }
    }
    export namespace Results {
        export interface Person {
            firstName: string
            lastName: string
        }
        export interface EmployeeDetails extends Person {
            id: number
            dependents: Person[]
        }
        export interface EmployeeSummary extends Person {
            id: number
            numDependents: number
        }
    }
}