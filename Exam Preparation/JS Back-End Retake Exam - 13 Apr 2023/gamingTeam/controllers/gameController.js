const { hasUser } = require('../middlewares/guards');
const { create, getById } = require('../services/gameService');
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

gameController.get('/:id', async (req, res) => {
    const game = await getById(req.params.id);

    if (req.user) {
        game.isOwner = game.owner.toString() === req.user._id.toString();
        game.isBought = game.boughtBy.map(b => b._id.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details Page', idStyle: 'details', game });
});

module.exports = gameController;