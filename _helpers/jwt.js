const expressJwt = require('express-jwt');
const userService = require('../services/users/user.service');
const { masterKey } = require('../config/index')

function jwt() {
    return expressJwt({ masterKey, algorithims: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that dont require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked (req, payload, done) {
    const user = await userService.getById(payload.sub);

    // Reject ttoken if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

module.exports = jwt;