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
        route "/employees" >=> 
            choose [
                GET >=> Handlers.fetchAll
                POST >=> Handlers.create
            ]
        GET >=> routeBind<DTO.Queries.FindEmployee> "/employees/{Id}" Handlers.fetchSingle
        DELETE >=> routeBind<DTO.Commands.DeleteEmployee> "/employees/{Id}" Handlers.delete
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
    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader() |> ignore

let configureApp (app : IApplicationBuilder) =
    app.UseCors(configureCors)
       .UseGiraffeErrorHandler(errorHandler)
       .UseGiraffe(webApp)

let configureServices (config: IConfigurationRoot) (services : IServiceCollection)  =
    [
        services.AddDbContext<Data.EmployeeContext>(fun options ->
            options.UseSqlServer(AppConfiguration.ConfigurationHelpers.GetDbConnectionString(config)) |> ignore);
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
    let config = AppConfiguration.ConfigurationHelpers.GetConfiguration(contentRoot)

    WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(contentRoot)
        .UseIISIntegration()
        .Configure(Action<IApplicationBuilder> configureApp)
        .ConfigureServices(configureServices config)
        .ConfigureLogging(configureLogging)
        .Build()
        .Run()
    0