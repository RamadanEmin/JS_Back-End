const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/authController');
const roomController = require('../controllers/roomController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/auth', authController);
    app.use('/room', roomController);
   
    app.all('*', defaultController);
}