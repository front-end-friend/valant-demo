# Valant Maze Runner

This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/angular)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Get started

Run `npm install` to install the UI project dependencies. Grab a cup of coffee or your beverage of choice.
You may also need to run `npm install start-server-and-test` and `npm install cross-env`

Make sure you have .Net 5.0 installed:
https://dotnet.microsoft.com/download

Make sure you are also update to date with Node.js

As you build new controller endpoints you can auto generate the api http client code for angular using `npm run generate-client:server-app`

## Development server

Run `npm run start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=demo` to generate a new component.

## Build

Run `ng build demo` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

- Run `ng test demo` to execute the unit tests via [Jest](https://jestjs.io).
- Run `nx affected:test` to execute the unit tests affected by a change.
- Run `npm run test:all` to run all unit tests in watch mode. They will re-run automatically as you make changes that affect the tests.

## About this Project
There are many things in this project that I did not get a chance to include in the timeframe of the exercise. Currently the app has a pre-built list of Mazes that can be modified in the MazeService. The user has the option of opening a 5x5 maze and interacting with the api to make valid moves. If more time was spent the functionality for reaching the end tile could be added as well as many tests verifying behavior that was testing manually in the process.

This app is in a good starting state to expand on if given more time, including a spritesheet to add more visually engaging maze designs with randomized variety thrown in so users keep experimenting with different designs!
