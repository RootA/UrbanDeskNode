const mongoose = require("mongoose");
const { dbUrl } = require("./index");
let winston = require("./winston");

module.exports = function() {
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);

    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        winston.log("debug", "Database Connected");
    }).catch((error) => {
        winston.log("error", `Error while connecting to database: ${error}`);
        require("applicationinsights").defaultClient.trackException({exception: error});
    });

    mongoose.connection.on("error", (err) => {
        winston.log("error", `Connection failed error => ${err}`);
        require("applicationinsights").defaultClient.trackException({exception: error});
    });

    mongoose.connection.on("disconnected", () => {
        winston.log("debug", "Database connection has been disconnected");
    });

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            winston.log("warn", "connection drop due to application termination");
            process.exit(0);
        });
    });
};
