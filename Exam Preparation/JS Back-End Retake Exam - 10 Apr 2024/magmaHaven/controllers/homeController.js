const { getAll } = require('../services/volcanoService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    const volcanos = await getAll();

    res.render('dashboard', { title: 'Catalog Page', volcanos });
});

module.exports = homeController;