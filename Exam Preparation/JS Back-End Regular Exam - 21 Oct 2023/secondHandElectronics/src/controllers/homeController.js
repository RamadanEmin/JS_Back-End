const { Router } = require('express');

const homeController = Router();
homeController.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});


module.exports = {
    homeController
};