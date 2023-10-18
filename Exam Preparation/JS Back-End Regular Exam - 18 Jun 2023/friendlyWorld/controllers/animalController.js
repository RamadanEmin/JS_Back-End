const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/animalService");
const { parseError } = require("../util/parser");

const animalController = require("express").Router();

animalController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

animalController.post('/create', hasUser(), async (req, res) => {
    const animal = {
        name: req.body.name,
        years: req.body.years,
        kind: req.body.kind,
        image: req.body.image,
        need: req.body.need,
        location: req.body.location,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(animal);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render("create", {
            title: "Create Page",
            errors,
            animal
        });
    }
});

module.exports = animalController;