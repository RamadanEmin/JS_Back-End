const { hasUser } = require('../middlewares/guards');
const { create, getById } = require('../services/stoneService');
const { parseError } = require('../util/parser');

const stoneController = require('express').Router();

stoneController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

stoneController.post('/create', hasUser(), async (req, res) => {
    const stone = {
        name: req.body.name,
        category: req.body.category,
        color: req.body.color,
        image: req.body.image,
        location: req.body.location,
        formula: req.body.formula,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(stone);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            stone
        });
    }
});

stoneController.get('/:id', async (req, res) => {
    const stone = await getById(req.params.id);

    if (req.user) {
        stone.isOwner = stone.owner.toString() === req.user._id.toString();
        stone.isLiked = stone.likedList.map(l => l.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details page', stone });
});

module.exports = stoneController;