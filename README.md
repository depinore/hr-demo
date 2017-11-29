# hr-demo
This is a demo web application showcasing F#, C#, TypeScript, and ReactJS integration.  My goal was to show the possibilities of a functional programming approach in an area that is generally dominated by C# and Object-Oriented Programming.  Even though this application is very small, the technologies here are what I would choose for larger-scale, enterprise grade apps.

## Back-End 
For the back-end, I've chosen the following technologies:

The API uses ASP.NET Core 2.0 built in F# with Giraffe.
- I chose F# because lends itself quite nicely to stateless API endpoint development.
- [Giraffe](https://github.com/dustinmoris/Giraffe) is a nice fit as well, as it allows me to create idiomatic F# code while still leveraging the power of ASP.NET Core.

The Logic layer is also built in F#.
- F# is an obvious choice for implementation of logic; functional languages make this a breeze.
- I also use [Fable](http://fable.io/) to transpile some of this logic into javascript, for use in the front-end.

The DTO layer is built in C#.
- I chose C# so that I could use [Typewriter](https://frhagn.github.io/Typewriter/), which allows me to easily generate TypeScript class definitions from C# code.
- This will ensure that the front-end TypeScript is kept in sync with the back-end data returned by the APIs.

The Data Layer is built in C#, with Entity Framework Core.
- Despite the fact that EF introduces a runtime overhead and many layers of abstractions, in applications where the dev team owns the database, I would recommend using EF Core for its db migration support.
- In apps where a separate database team is managing the maintenance and deployment of your database, I would instead opt for Dapper and Stored Procedures.

## Front-End

For the front-end, I've chosen the following technologies:
    
TypeScript for the Javascript Transpiler
- This is honestly my favorite language, and allows tremendous developer ergonomics when creating JSX templates.  (Refactoring is so easy!)

Vanilla CSS
- I would normally opt to use a CSS transpiler like LESS or SASS, but I don't plan to write very much CSS by hand for this demo app.

ReactJS for the SPA framework.
- Functional components allow me to keep a coding style that is consistent with my functional-first back-end.

[React.Semantic-UI](https://react.semantic-ui.com/introduction) for the component framework.
- Normally, I would actually choose to write my components by hand, as it allows greater control over the output CSS.  This is particularly true if I'm working with a design team that has specific UI requirements.

[redux](https://github.com/reactjs/react-redux), [react-router](https://github.com/ReactTraining/react-router), and [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) for state management.
- This application isn't going to be very complex, but redux offers a nice abstraction over your application's state.  Using redux, it will enable me to forego having to write very many stateful components.
- react-router and react-router-redux will ensure that the application state is persisted in the URL to support native forward/backward navigation in the browser.

## TODOs
- Migrate CostAnalysis code from TypeScript into F#.
    - In order to achieve this, first Fable needs to be set up on the back-end and front-end.
    - This will give us the ability to pre-calculate the cost of employees from the back-end, so that all of the employee dependents don't have to be sent to the front-end for that calculation to be performed.
    - Fable will let us transpile the logic into JavaScript, for use in back-end and front-end simultaneously.
- Set up TypeWriter and use Visual Studio to auto-generate the DTOs for the front-end.  
    - Right now, dto.d.ts is being written by hand, which is not efficient.
- Create some CSS; the UI is essentially unstyled.
- Use redux-thunk or even redux-saga to better handle complex AJAX pipelines.  Right now, I'm managing these pipelines manually in actions.ts.
- Use react-state to persist the app state in the URL.  Right now, browser refreshes completely reset the state of the front-end.
- Implement form validation.
- Implement the ability to click on an Employee and edit their information.

## Installation Instructions
Note: this application has been tested on both Windows Server 2016 and Windows 10.  The back-end has been tested using PowerShell, and the front-end has been tested using the Windows Subsystem for Linux (Ubuntu bash).  Although not tested, this application should also run on Linux or macOS.

1. Install the latest [.NET Core](https://www.microsoft.com/net/learn/get-started).
1. Install the latest [nodeJS](https://nodejs.org).
1. Install [create-react-app](https://github.com/facebookincubator/create-react-app) globally.
1. Make sure you have an instance of SQL Server, SQL Server Express, or localdb available to the machine that will run this code.
1. Open the command prompt.
1. Navigate to the root of this repo.
1. Navigate to `back-end`.
1. Run `dotnet restore` to restore NuGet packages.
1. Navigate to `data`.
1. By default, hrdemo assumes that there is a SQL Server instance located at "`localost\SQL EXPRESS`".  If you would like to change this, either set an environment variable by the name of `hr_demo_db` to the appropriate ConnectionString, or modify `appsettings.json` located in the `Api` project.

    I would recommend creating an environment variable in your shell.  To change the connection to a localdb instance using PowerShell, for example:
    ```
    $Env:hr_demo_db = "Data Source=(LocalDB)\v11.0;InitialCatalog=DatabaseName;Integrated Security=True;"
    ```
1. After setting your connection string, make sure you're in the `data` directory, then set up the database using Entity Framework Core with the command: 
    ```
    dotnet ef database update
    ``` 
1. Navigate to the `api` directory then run the command `dotnet run` .  Feel free to hit `http://localhost:5000/employees` from your browser to test out the API.
1. Open a new command prompt.  Navigate to repo's `front-end/hrdemo` directory.
1. Run the command `npm i && npm run start` to install all NPM dependencies then start the React application.  It should open the front-end on `http://localhost:3000` and automatically communicate with the back-end using CORS.

## Usage Instructions
1. You should be presented with the Summary page.
1. Click New.
1. Fill out the form.  Make sure to input users whose first name begins with an 'a' or 'A' to test out the discount functionality.  Discounts also work on the employee as well.
1. Add dependents by clicking "Add dependent".
1. Remove dependents by clicking "Remove" next to the appropriate dependent.
1. As you fill out the form, you should see a Cost Analysis Breakdown updating near the bottom of the form.
1. Once done, click Save.
1. Feel free to validate that the SQL Server back-end has been populated with your new data.
1. You should see your new entry in the summary page.
    * Note: I did not implement the ability to actually modify an Employee after having created it.  Once you click Save, there is no way to get back to that Employee's details.
1. On the Summary page, you should see a summary of all employees in the system, with their total calculated cost based on what you input for them.
1. Clicking on Delete will delete that employee from the system.

Enjoy!