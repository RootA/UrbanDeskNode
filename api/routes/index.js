module.exports = (app, logger) => {
    app.get('/', async (req, res, err) => {
        if(err){
            logger.error(err);
        }
        logger.info('Root URL accessed');
        res.json({ 'hello': 'Welcome to UrbanDesk. A new work to work away from your work'});
    })
};