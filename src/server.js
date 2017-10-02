// Clarify node vs express (express is used to setup an http server)
// Modules are pretty much everything here
// Modules installed via npm
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
// Provides utilities for working with file and directory paths.
// Modules I created myself
const routes = require('./server/routes');
// Automatically looks for index file - node! (./ signifies same directory and no file extensions needed too!)
const Config = require('./config/config');
const config = Config.getConfig();

const pgSession = require('connect-pg-simple')(session);

const app = express();

//Views
app.set('view engine', 'pug');
// This helps express read the files
app.set('views', __dirname + '/views');
// This helps express find the files Check if needed?
app.locals.basedir = path.join(__dirname, '/views');
// Sets up request.locals.basedir in routes

//Public
app.use(express.static('public'));
// Static files don't change. Necessary for page. They're made available to the public as a url with their name.
// script.js is browser/front-end. server.js is server/back-end.

//Middleware
// Run before all routes. app.use = middleware . Order matters.
app.use(bodyParser.urlencoded({ extended: true }));
// Finds within the response the body string and parses into request.body
app.use(methodOverride('_method'));
// Overrides form methods to whatever route you might need
app.use(session({
  key: 'user_id',
  secret: 'pirates',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 600000 }
}));
// Sets up the cookie session
app.use(cookieParser());
// Finds the cookie and parses the information within it

//Routes
app.use('/', routes);

const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = app;
