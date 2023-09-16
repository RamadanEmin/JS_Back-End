const homeController = require('../controllers/homeController');
const defaultController = require('../controllers/defaultController');

module.exports = (app) => {
    app.use(homeController);
   
    app.all('*', defaultController);
}