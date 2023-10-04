const homeController = require("express").Router();

const { getRecent, getAll } = require("../services/housingService");

homeController.get("/", async (req, res) => {
    const housings = await getRecent();

    res.render("home", { title: "Home Page", housings });
});

homeController.get("/housings", async (req, res) => {
    const housings = await getAll();

    res.render("housings", { title: "Housings For Rent", housings });
});

module.exports = homeController;