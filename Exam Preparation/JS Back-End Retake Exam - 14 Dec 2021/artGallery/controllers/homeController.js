const homeController = require("express").Router();

const { getAll } = require("../services/artService");

homeController.get("/", async (req, res) => {
  res.render("home", { title: "Home Page", arts: await getAll() });
});

module.exports = homeController;