/* ***************************************************************************
 * INITIALIZE
 * require express to use it
 * const express = require('express');
 ******************************************************************************/
// Configuring Node.js to use ES6
// after changing package json use import instead
import express from 'express';
import cors from 'cors'; // import cors: Integrating React applications with RESTful Web service APIs
// Cross Origin Resource Sharing and establishes the rules by which resources can be shared across domains (origins)

import HelloController from './controllers/hello-controller.js';
import UserController from './controllers/users/users-controller.js';
import TuitsController from './controllers/tuits/tuits-controller.js';

// execute the request and save return value to a var app
const app = express();
// configure cors right after instantiating express
app.use(cors());
// parse JSON from HTTP request body
app.use(express.json());

// call controller
HelloController(app);
UserController(app);
TuitsController(app);

app.listen(process.env.PORT || 4000);
