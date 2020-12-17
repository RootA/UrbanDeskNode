const mongoose = require("mongoose");
const { dbUrl } = require("./index");
let logger = require("../loaders/logger");

module.exports = function() {
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);

    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        logger.info("Database Connected");
    }).catch((error) => {
        logger.error(`Error while connecting to database: ${error}`);
        // require("applicationinsights").defaultClient.trackException({exception: error});
    });

    mongoose.connection.on("error", (err) => {
        logger.error(`Connection failed error => ${err}`);
        // require("applicationinsights").defaultClient.trackException({exception: error});
    });

    mongoose.connection.on("disconnected", () => {
        logger.error("Database connection has been disconnected");
    });

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            logger.warn("connection drop due to application termination");
            process.exit(0);
        });
    });
};
