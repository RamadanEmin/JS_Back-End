const { getAll } = require('../services/auctionService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    res.render('catalog', { title: 'Catalog', auctions: await getAll() });
});

module.exports = homeController;