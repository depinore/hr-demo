# hr-demo
This is a demo application demonstrating how I would construct a simple web application using functional programming techniques.

For the back-end, I've chosen the following technologies:

The WebAPI is built in F# with Giraffe.
- I chose these technologies as F# lends itself quite nicely to stateless API endpoint development.
- Giraffe is a nice fit as well, as it allows me to create idiomatic F# code while still leveraging the power of ASP.NET Core.

The Logic layer is also built in F#.
- F# is an obvious choice for implementation of logic; functional languages make this a breeze.
- I also use Fable to transpile some of this logic into javascript, for use in the front-end.

The DTO layer is built in C#.
- I chose C# so that I could use Typewriter, which allows me to easily generate TypeScript class definitions from C# code.
- This will ensure that the front-end TypeScript is kept in sync with the back-end data returned by the APIs.
The Data Layer is built in C#, with Entity Framework Core.
- Despite the fact that EF introduces a runtime overhead and many layers of abstractions, I feel it's suitable for a small application where development speed is the primary concern.
- In larger applications, or in apps where performance is a greater concern, I would instead opt to use hand-written T-SQL and Dapper.

For the front-end, I've chosen the following technologies:
    
TypeScript for the Javascript Transpiler
- This is honestly my favorite language, and allows tremendous developer ergonomics when creating JSX templates.  (Refactoring is so easy!)

Vanilla CSS
- I would normally opt to use a CSS transpiler like LESS or SASS, but I don't plan to write very much CSS by hand for this demo app.

ReactJS for the SPA framework.
- Functional components allow me to keep a coding style that is consistent with my functional-first back-end.

React.Semantic-UI for the component framework.
- Normally, I would actually choose to write my components by hand, as it allows greater control over the output CSS.  This is particularly true if I'm working with a design team that has specific UI requirements.

redux, react-router, and react-router-redux for state management.
- This application isn't going to be very complex, but redux offers a nice abstraction over your application's state.  Using redux, it will enable me to forego having to write very many stateful components.
- react-router and react-router-redux will ensure that the application state is persisted in the URL to support native forward/backward navigation in the browser.