const { Router } = require('express');
const { getRecent, getAll } = require('../services/recipeService');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const recipes = await getRecent();
    res.render('home', { title: 'Home Page', recipes });
});

homeController.get('/catalog', async (req, res) => {
    const recipes = await getAll();
    res.render('catalog', { title: 'Catalog Page', recipes });
});

module.exports = {
    homeController
};