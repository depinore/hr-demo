module Handlers
    open Giraffe.HttpHandlers
    open Giraffe.HttpContextExtensions
    open Microsoft.AspNetCore.Http
    open Giraffe.Tasks

    let getService (ctx: HttpContext) =
        ctx.RequestServices.GetService(typedefof<Data.IEmployeeRepository>) 
                    :?> Data.IEmployeeRepository

    let fetchAll (next:HttpFunc) (ctx: HttpContext) =
        task {
            let svc = getService ctx
            let! result = svc.GetAll()
            return! json result next ctx
        }
    let fetchSingle (query: DTO.Queries.FindEmployee) (next: HttpFunc) (ctx: HttpContext) =
        task {
            let svc = getService ctx
            let! result = svc.Find(query)
            return! json result next ctx
        }

    let create (next: HttpFunc) (ctx: HttpContext) =
        task {
            let svc = getService ctx
            let! cmd = ctx.BindJson<DTO.Commands.CreateEmployee>()
            let! result = svc.Add(cmd)
            return! json result next ctx
        }
    let delete (next: HttpFunc) (ctx: HttpContext) =
        task {
            let svc = getService ctx
            let! cmd = ctx.BindJson<DTO.Commands.DeleteEmployee>()
            do! svc.Delete(cmd)
            return! setStatusCode 200 next ctx
        }    