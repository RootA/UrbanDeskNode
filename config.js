let express = require("express");
let morgan = require("morgan");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

module.exports = function(app, logger) {
    app.use(helmet.hidePoweredBy())
    const sixtyDaysInSeconds = 5184000
    app.use(helmet.hsts({
      maxAge: sixtyDaysInSeconds
    }))
    app.use(helmet.ieNoOpen())
    app.use(helmet.noSniff())
    app.use(helmet.xssFilter())
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan("combined", { stream: logger.stream }))
    app.use(cookieParser())

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // include winston logging
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};