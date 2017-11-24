module Api.App

open System
open System.IO
open System.Collections.Generic
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Giraffe.HttpHandlers
open Giraffe.Middleware
open Api.Models
open Microsoft.Extensions.Options
open Microsoft.EntityFrameworkCore
open Microsoft.Extensions.Configuration

// ---------------------------------
// Web app  
// ---------------------------------

let webApp =
    choose [
        route "/" >=> 
            choose [
                GET >=> Handlers.fetchAll
                POST >=> Handlers.create
                DELETE >=> Handlers.delete
            ]
        routeBind<DTO.Queries.FindEmployee> "/{Id}" Handlers.fetchSingle
        setStatusCode 404 >=> text "Not Found" ]

// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

// ---------------------------------
// Config and Main
// ---------------------------------

let configureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins("http://localhost:8080").AllowAnyMethod().AllowAnyHeader() |> ignore

let configureApp (app : IApplicationBuilder) =
    app.UseCors(configureCors)
       .UseGiraffeErrorHandler(errorHandler)
       .UseGiraffe(webApp)

let configureServices (config: IConfigurationRoot) (services : IServiceCollection)  =
    [
        services.AddDbContext<Data.EmployeeContext>(fun options ->
            options.UseSqlServer(config.GetConnectionString("db")) |> ignore);
        services.AddCors();
        services.AddScoped<Data.IEmployeeRepository, Data.EmployeeRepository>();
        services.AddSingleton<IConfigurationRoot>(config)
    ] |> ignore

let configureLogging (builder : ILoggingBuilder) =
    let filter (l : LogLevel) = l.Equals LogLevel.Error
    builder.AddFilter(filter).AddConsole().AddDebug() |> ignore

[<EntryPoint>]
let main argv =
    let contentRoot = Directory.GetCurrentDirectory()
    let webRoot     = Path.Combine(contentRoot, "WebRoot")
    let config = AppConfiguration.ConfigurationHelpers.GetConfiguration()

    WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(contentRoot)
        .UseIISIntegration()
        .UseWebRoot(webRoot)
        .Configure(Action<IApplicationBuilder> configureApp)
        .ConfigureServices(configureServices config)
        .ConfigureLogging(configureLogging)
        .Build()
        .Run()
    0