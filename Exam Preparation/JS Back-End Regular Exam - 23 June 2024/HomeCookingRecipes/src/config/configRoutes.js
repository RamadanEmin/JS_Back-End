const { homeController } = require('../controllers/homeController');
const { userController } = require('../controllers/userController');

function configRoutes(app) {
    app.use(homeController);
    app.use(userController);
    app.get('*', (req, res) => {
        res.render('404');
    });
}

module.exports = {
    configRoutes
};