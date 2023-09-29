const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { isGuest } = require('../middlewares/guards');
const { register } = require('../services/userService');
const { parseError } = require('../util/parser');

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page', });
});

authController.post('/register',
    isGuest(),
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username may contain only english letters and numbers'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
        .isAlphanumeric().withMessage('Password may contain only english letters and numbers'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            if (req.body.password != req.body.repass) {
                throw new Error('Password don\'t match');
            }

            const token = await register(req.body.username, req.body.password);

            res.cookie('token', token);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            const errors = parseError(error);
            res.render('register', {
                title: 'Register Page',
                errors,
                body: {
                    username: req.body.username,
                },
            });
        }
    });

module.exports = authController;