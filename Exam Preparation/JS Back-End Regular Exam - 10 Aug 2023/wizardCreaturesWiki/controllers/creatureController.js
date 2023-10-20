const creatureController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/creatureService");
const { parseError } = require("../util/parser");

creatureController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

creatureController.post('/create', hasUser(), async (req, res) => {
    const creature = {
        name: req.body.name,
        species: req.body.species,
        skinColor: req.body.skinColor,
        eyeColor: req.body.eyeColor,
        image: req.body.image,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(creature);
        res.redirect('/catalog');
    } catch (error) {
        console.error(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            creature
        });
    }
});

module.exports = creatureController;