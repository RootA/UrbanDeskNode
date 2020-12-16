let appRoot = require("app-root-path");
const {env} = require("../config/index");
const {createLogger, format, transports}  = require("winston");
const {combine, timestamp, label, prettyPrint} = format;

const timezoned = () => {
    return new Date().toLocaleString("en-US", {
      timeZone: "Africa/Nairobi"
    });
  };

const customFormat = format.printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

let options = {
    infoFile: {
        level: "info",
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: false,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true
    },
    errorFile: {
        level: "error",
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    },
    verboseFile: {
        level: "verbose",
        filename: `${appRoot}/logs/verbose.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    },
    debugFile: {
        level: "debug",
        filename: `${appRoot}/logs/debug.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    },
    exceptionsFile: {
        level: "warn",
        filename: `${appRoot}/logs/exceptions.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true
    },
    console_prod: {
        level: "info",
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

let transportsettings = [new transports.File(options.errorFile)]
if (env == "development") {
    transportsettings.push(new transports.Console(options.console))
} else {
    transportsettings.push(new transports.Console(options.console_prod))
}

// instantiate a new Winston Logger with the settings defined above
let logger = new createLogger({
    format: combine(
        label({ label: "URBAAN DESK" }),
        timestamp({
            format: timezoned
        }),
        prettyPrint(),
        customFormat
    ),
    transports: transportsettings,
    exceptionHandlers: [
        new transports.File(options.exceptionsFile)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function(message, encoding){
        logger.debug(message);
    }
}
// Call exceptions.handle with a transport to handle exceptions
logger.exceptions.handle(
    new transports.File(options.exceptionsFile)
);

module.exports = logger;