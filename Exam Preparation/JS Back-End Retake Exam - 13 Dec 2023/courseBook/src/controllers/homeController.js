const { Router } = require('express');
const { getAll, getRecent } = require('../services/courseService');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const courses = await getRecent();
    res.render('home', { title: 'Home Page',courses });
});

homeController.get('/catalog', async (req, res) => {
    const courses = await getAll();
    res.render('catalog', { title: 'Catalog Page', courses });
});

module.exports = {
    homeController
};