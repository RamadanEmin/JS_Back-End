const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use(homeController);
    app.use((req, res, next) => {
        res.render('404', { title: 'Error Page' });
    });
}