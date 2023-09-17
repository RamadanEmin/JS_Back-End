const homeController = require('../controllers/homeController');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/auth', authController);
   
    app.all('*', defaultController);
}