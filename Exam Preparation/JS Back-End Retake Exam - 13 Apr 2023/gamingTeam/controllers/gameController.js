const { hasUser } = require('../middlewares/guards');
const { create } = require('../services/gameService');
const { parseError } = require('../util/parser');

const gameController = require('express').Router();

gameController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page', idStyle: 'create' });
});

gameController.post('/create', hasUser(), async (req, res) => {
    const game = {
        platform: req.body.platform,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        genre: req.body.genre,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(game);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            idStyle: 'create',
            errors,
            game
        });
    }
});

module.exports = gameController;