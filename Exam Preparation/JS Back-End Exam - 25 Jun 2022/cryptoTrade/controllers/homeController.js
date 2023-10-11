const { getAll } = require('../services/cryptoService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

homeController.get('/catalog', async (req, res) => {
    const crypto = await getAll();

    res.render('catalog', { title: 'Catalog', crypto });
});

module.exports = homeController;