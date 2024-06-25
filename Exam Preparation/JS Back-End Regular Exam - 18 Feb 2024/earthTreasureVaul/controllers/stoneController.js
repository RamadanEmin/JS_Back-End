const { hasUser } = require('../middlewares/guards');
const { create } = require('../services/stoneService');
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

module.exports = stoneController;