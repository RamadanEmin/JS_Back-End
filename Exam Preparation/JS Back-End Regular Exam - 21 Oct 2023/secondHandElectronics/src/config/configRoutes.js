const { homeController } = require('../controllers/homeController');

function configRoutes(app) {
    app.use(homeController);
}

module.exports = {
    configRoutes
};