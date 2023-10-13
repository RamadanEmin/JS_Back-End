const { getAll } = require('../services/bookService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
  const books = await getAll();

  res.render('catalog', { title: 'Catalog Page', books });
});

module.exports = homeController;