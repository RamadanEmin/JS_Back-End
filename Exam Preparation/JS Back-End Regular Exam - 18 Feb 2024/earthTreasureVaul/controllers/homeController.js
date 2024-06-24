const { getLastStone } = require('../services/stoneService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const stones = await getLastStone();

    res.render('home', { title: 'Home Page', stones });
});

module.exports = homeController;