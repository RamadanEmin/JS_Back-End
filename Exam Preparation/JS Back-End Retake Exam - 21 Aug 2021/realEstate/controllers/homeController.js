const homeController = require("express").Router();

const { getRecent } = require("../services/housingService");

homeController.get("/", async (req, res) => {
    const housings = await getRecent();

    res.render("home", { title: "Home Page", housings });
});

module.exports = homeController;