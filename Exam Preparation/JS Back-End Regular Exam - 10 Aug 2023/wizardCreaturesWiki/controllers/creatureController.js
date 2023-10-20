const creatureController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { create, getById } = require("../services/creatureService");
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

creatureController.get('/:id', async (req, res) => {
    const creature = await getById(req.params.id);

    if (req.user) {
        creature.isOwner = creature.owner._id.toString() === req.user._id.toString();
        creature.hasVote = creature.votes.find(v => v._id.toString() === req.user._id.toString());
    }
    
    creature.printVotes = creature.votes.map(v => {
        const votes = [];
        votes.push(v.email);
        return votes;
    }).join(', ');

    res.render('details', { title: 'Details Page', creature });
});

module.exports = creatureController;