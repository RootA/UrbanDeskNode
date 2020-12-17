const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    endpoint: process.env.API_URL,
    env: process.env.NODE_ENV,
    masterKey: process.env.SECRET_KEY,
    port: process.env.PORT || 8080,
    dbUrl: process.env.MONGODB,
};
