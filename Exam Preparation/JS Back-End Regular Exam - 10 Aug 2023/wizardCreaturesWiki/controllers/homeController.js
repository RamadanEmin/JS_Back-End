const homeController = require('express').Router();

const { getAll } = require('../services/creatureService');

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    const creatures = await getAll();

    res.render('catalog', { title: 'Catalog Page', creatures });
});

module.exports = homeController;