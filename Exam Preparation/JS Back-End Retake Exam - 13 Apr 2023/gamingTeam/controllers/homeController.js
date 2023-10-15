const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', idStyle: 'home' });
});

module.exports = homeController;