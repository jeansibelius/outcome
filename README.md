# Outcome

### A simple app to track the outcome of your income against a set budget

#### [Demo hosted on Heroku](https://outcome-demo.herokuapp.com/) (might take a moment to start while the Heroku instance wakes up)
Demo username: `hari.seldon@foundation.org`, password: `test`  

License: All rights reserved © Rafael Linnankoski (further details [here](https://github.com/jeansibelius/outcome/blob/master/LICENSE.md)).

## Project structure

The project is structured as a monorepo with utility scripts in the root package.json (e.g. build).
It is divided into two folders (client & server) and further within those all source code is located in `./src/`.
Build directories are gitignored.

The project is written in TypeScript in vim with eslint and prettier enabled.

#### Server
The server uses the following stack:
- [Apollo Server](https://formik.org/docs/overview) with Express 
- [TypeGraphQL](https://formik.org/docs/overview) (to build the schema without duplicating type
  definitions) 
- [typegoose](https://formik.org/docs/overview) (to help with mongoose model creation without
  further duplication of types) 
- MongoDB (using MongoDB atlas)

#### Client
The client created with Create React App with PWA typescript template and uses the following stack:
- [Apollo Client (GraphQL)](https://formik.org/docs/overview) 
- [Semantic UI react](https://github.com/fomantic/Fomantic-UI) components (with [Fomantic UI CSS](https://github.com/fomantic/Fomantic-UI))
- [Tailwindcss](https://tailwindcss.com/docs/installation) in a few places (mainly to test out the framework) 
- [Formik](https://formik.org/docs/overview) (for form related things)


## How to run

### Required env variables
- The server requires the following env vars to be set
  - `MONGODB_URI_PROD`: a connection URI containing the username and password of the MongoDB instance
  - `MONGODB_URI_DEMO`: a connection URI for the demo instance
  - `MONGODB_URI_TEST`: a connection URI for testing 
  - `MONGODB_URI_DEV`: a connection URI for development 
  - `JWT_SECRET`: used to create and verify hashed passwords

### Production mode
In the root...  
- `npm run install` to run installation script for both sub-folders (client & server)
- `npm run build` to run build scripts in both sub-folders
- `npm start` to run the backend production build (which serves also the client build)
- `npm run deploy:demo` to deploy the project to the Heroku demo instance (might need to update script to deploy the
  correct/desired branch)
- `npm run deploy` to deploy the project to the production instance of Heroku

### Development
In `./client`...
- `npm start` to run the project at `localhost:3000`
- and other basic installation/build scripts, as required

In `./server`...
- `npm run dev` to run the backend in development mode with hot reloading at `localhost:4000/graphql`
- and other basic installation/build scripts, as required

### Testing
In `./server`
- `npm test` to run jest (with coverage).
- `npm run test:verbose` for verbose output
- `npm run test:watch` to have jest watching for changes

## Roadmap

The roadmap can be viewed [here](https://github.com/jeansibelius/outcome/blob/master/ROADMAP.md).
