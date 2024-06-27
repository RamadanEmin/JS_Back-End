const { homeController } = require('../controllers/homeController');
const { userController } = require('../controllers/userController');

function configRoutes(app) {
    app.use(homeController);
    app.use(userController);
}

module.exports = {
    configRoutes
};