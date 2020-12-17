const User = require("../../models/UserModel");

module.exports = (app, logger) => {
    app.post('/register', async(req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.name
        });
    
        try {
            const savedUser = await user.save();
            res.json({ error: null, data: savedUser });
        } catch (err) {
            logger.error(err)
        };
    });
};