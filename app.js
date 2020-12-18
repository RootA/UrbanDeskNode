var express = require('express');

const { port, endpoint } = require('./config/index');
var logger = require('./loaders/logger');

const app = express();
server = require("http").Server(app);

//database connection and settings
require("./config/database")();

require("./config")(app, logger);
require("./api/routes/index")(app, logger);

// api routes
app.use('/users', require('./services/users/user.service'));

server.listen(port);
logger.info(`Your application is running on ${endpoint}:${port}`);

