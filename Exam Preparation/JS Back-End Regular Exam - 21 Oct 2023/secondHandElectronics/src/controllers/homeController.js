const { Router } = require('express');
const { getAll } = require('../services/electronics');

const homeController = Router();
homeController.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    const electronics = await getAll();
    res.render('catalog', { title: 'Catalog Page', electronics });
});

module.exports = {
    homeController
};