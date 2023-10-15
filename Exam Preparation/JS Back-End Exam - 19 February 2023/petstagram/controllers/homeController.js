const { getAll } = require('../services/photoService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
  res.render('home', {
    title: 'Home'
  });
});

homeController.get('/catalog', async (req, res) => {
  const photos = await getAll();

  res.render('catalog', {
    title: 'Catalog',
    photos
  });
});

module.exports = homeController;