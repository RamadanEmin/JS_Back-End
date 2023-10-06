const artController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { hasUser, isOwner } = require('../middlewares/guards');
const { createArt } = require('../services/artService');
const { parseError } = require('../util/parser');
const preload = require('../middlewares/preload');

artController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

artController.post('/create',
    hasUser(),
    body('title')
        .isLength({ min: 6 }).withMessage('Title should be at least 6 characters long'),
    body('technique')
        .isLength({ max: 15 }).withMessage('Technique should be at most 15 characters long'),
    body('certificate')
        .matches(/^(?:yes|no)$/i).withMessage('Yes or No are only valid'),
    body('picture')
        .matches(/^https?:\/\/.+$/i).withMessage('Invalid pucture, should start with http:// or https://'),
    async (req, res) => {
        const art = {
            title: req.body.title,
            technique: req.body.technique,
            certificate: req.body.certificate,
            picture: req.body.picture,
            owner: req.user._id
        };

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            await createArt(art);
            res.redirect('/gallery');
        } catch (error) {
            console.log(error);
            const errors = parseError(error);
            res.render('create', {
                title: 'Create Page',
                errors,
                art
            });
        }
    });

artController.get('/:id', preload(true), (req, res) => {
    const art = res.locals.art;

    if (req.user) {
        art.isOwner = req.user._id.toString() === art.owner._id.toString();
        art.hasShared = art.users.map(u => u.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: art.title, art });
});

artController.get('/:id/edit', hasUser(), preload(true), isOwner(), (req, res) => {
    const art = res.locals.art;

    res.render('edit', { title: 'Edit Page', art });
});

module.exports = artController;