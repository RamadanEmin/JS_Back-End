const playController = require('express').Router();

const preload = require('../middlewares/preload');
const { createPlay } = require('../services/playService');
const { parseError } = require('../util/parser');

playController.get('/create', (req, res) => {
    res.render('create', { title: 'Create Page' });
});

playController.get('/:id', preload(true), (req, res) => {
    const play = res.locals.play;

    play.isOwner = req.user._id.toString() === play.owner.toString();
    play.hasLiked = play.likes.map(x => x.toString()).includes(req.user._id.toString());

    res.render('details', { title: play.title, play });
});

playController.post('/create', async (req, res) => {
    const play = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isPublic: !!req.body.isPublic,
        owner: req.user._id
    };

    try {
        const playData = await createPlay(play);
        res.redirect(`/play/${playData._id}`);
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            play
        });
    }
});

module.exports = playController;