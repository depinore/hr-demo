namespace BLL

module Conversion = 
    let toPerson (p: Entities.Person) =
        DTO.Results.Person(FirstName = p.FirstName, LastName = p.LastName)

    let toDetails (e: Entities.Employee) =
        let result = DTO.Results.EmployeeDetails()
        result.Id <- e.Id
        result.FirstName <- e.FirstName
        result.LastName <- e.LastName
        result.Dependents <- e.Dependents |> List.ofSeq |> List.map toPerson
        result