module Handlers
    open Giraffe.HttpHandlers
    open Microsoft.AspNetCore.Http
    open Microsoft.Extensions.Configuration

    let fetchAll (next:HttpFunc) (ctx: HttpContext) =
        let configuration = ctx.RequestServices.GetService(typedefof<IConfigurationRoot>) 
                                :?> IConfigurationRoot
        (configuration.["ConnectionStrings:db"] |> text) next ctx