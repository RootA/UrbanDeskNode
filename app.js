var express = require('express');

const { port, endpoint } = require('./config/index');
var logger = require('./loaders/logger');

const app = express();

require("./config")(app, logger);
require("./api/routes/index")(app, logger);

server = require("http").Server(app);

server.listen(port);
logger.info(`Your application is running on ${endpoint}:${port}`);

