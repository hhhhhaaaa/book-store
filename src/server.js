const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

//Views
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.basedir = path.join(__dirname, '/views');

//Public
app.use(express.static('public'));

//Middleware
app.use(bodyParser.urlencoded({ extended: true })); //still don't know why true or false
app.use(methodOverride('_method'));

//Routes
app.use('/', routes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
