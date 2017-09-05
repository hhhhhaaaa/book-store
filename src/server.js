const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const routes = require('./server/routes');
const Config = require('./config/config');
const config = Config.getConfig();

const app = express();

//Views
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.basedir = path.join(__dirname, '/views');

//Public
app.use(express.static('public'));

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Routes
app.use('/', routes);


const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
