const { Router } = require('express');
const { create } = require('../services/recipeService');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const recipeController = Router()

recipeController.get('/create', isUser(), async (req, res) => {
    res.render('create', { title: 'Create Page' });
})

recipeController.post('/create', isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('The title should be at least 2 characters long'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('The Description should be between 10 and 100 characters long'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('The ingredients should be between 10 and 200 characters long'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('The instructions should be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Image should start with http:// or https://'),
    async (req, res) => {

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            await create(req.body, req.user._id);
            res.redirect('/catalog');
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    }
);

module.exports = {
    recipeController
};