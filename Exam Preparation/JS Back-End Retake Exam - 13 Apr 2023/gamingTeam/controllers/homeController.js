const { getAll } = require('../services/gameService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', idStyle: 'home' });
});

homeController.get('/catalog', async (req, res) => {
    const games = await getAll();

    res.render('catalog', { title: 'Catalog Page', idStyle: 'catalog', games });
});

module.exports = homeController;