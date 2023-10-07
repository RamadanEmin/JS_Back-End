const { getAll } = require("../services/addService");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  const adds = await getAll('', 3);

  res.render('home', { title: 'Home Page', adds });
});

module.exports = homeController;