module Handlers
    open Giraffe.HttpHandlers
    open Microsoft.AspNetCore.Http
    open Microsoft.Extensions.Configuration

    let fetchAll (getConfig: unit -> IConfigurationRoot) (next:HttpFunc) (ctx: HttpContext) =
        let c = getConfig()
        (c.["ConnectionStrings:db"] |> text) next ctx