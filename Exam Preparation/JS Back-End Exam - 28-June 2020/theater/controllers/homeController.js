const { getAllByDate, getAllByLikes } = require('../services/playService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    let plays = [];

    if (req.user) {
        plays = await getAllByDate();
    } else {
        plays = await getAllByLikes();

    }

    res.render('home', { title: 'Home Page', plays });
});

module.exports = homeController;
