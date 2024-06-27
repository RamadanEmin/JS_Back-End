const { Router } = require('express');
const { getRecent } = require('../services/recipeService');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const recipes = await getRecent();
    res.render('home', { title: 'Home Page', recipes });
});

module.exports = {
    homeController
};