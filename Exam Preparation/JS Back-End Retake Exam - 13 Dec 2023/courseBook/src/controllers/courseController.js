const { Router } = require('express');
const { create } = require('../services/courseService');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const courseController = Router();

courseController.get('/create', isUser(), async (req, res) => {
    res.render('create', { title: 'Create Page' });
})

courseController.post('/create', isUser(),
    body('title').trim().isLength({ min: 5 }).withMessage('Title should be at least 5 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Image must be a valid URL start with http:// or https://'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description should be at least 10 characters long'),
    body('type').trim().isLength({ min: 3 }).withMessage('Type must be at least 3 characters long'),
    body('certificate').trim().isLength({ min: 2 }).withMessage('Certificate should be at least 2 characters long'),
    body('price').trim().isInt({ min: 0 }).withMessage('Price should be a positive number'),
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
    courseController
};