const { Router } = require('express');
const { getRecent } = require('../services/courseService');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const courses = await getRecent();
    res.render('home', { title: 'Home Page',courses });
});

module.exports = {
    homeController
};