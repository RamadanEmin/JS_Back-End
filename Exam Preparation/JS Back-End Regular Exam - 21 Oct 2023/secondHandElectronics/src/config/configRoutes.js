const { homeController } = require('../controllers/homeController');

function configRoutes(app) {
    app.use(homeController);
    app.get('*', (req, res) => {
        res.render('404');
    });
}

module.exports = {
    configRoutes
};