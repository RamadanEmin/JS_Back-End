const { Router } = require('express');
const { create } = require('../services/electronics');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const electronicsController = Router()

electronicsController.get('/create', isUser(), async (req, res) => {
    res.render('create', { title: 'Create Page' });
})

electronicsController.post('/create', isUser(),
    body('name').trim().isLength({ min: 10 }).withMessage('Name should be at least 10 characters long'),
    body('type').trim().isLength({ min: 2 }).withMessage('Type must be at least 2 characters long'),
    body('damages').trim().isLength({ min: 0 }).withMessage('Damages should be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Electronic\'s image must be a valid URL'),
    body('description').trim().isLength({ min: 10, max: 200 }).withMessage('Description should be between 10 and 200'),
    body('production').trim().isInt({ min: 1900, max: 2023 }).withMessage('Production should be between 1900 and 2023'),
    body('exploatation').trim().isInt({ min: 0 }).withMessage('Exploatation must to be a positive number'),
    body('price').trim().isInt({ min: 0 }).withMessage('Price must to be a positive number'),
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
    electronicsController
};