const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { isGuest } = require('../middlewares/guards');
const { register } = require('../services/userService');
const { parseError } = require('../util/parser');


authController.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

authController.post('/register', isGuest(),
    body('username').isLength({ min: 4 }).withMessage('Username should be at least 4 characters long'),
    body('password').isLength({ min: 3 }).withMessage('Password should be at least 3 characters long'),
    body('repass').custom((repass, { req }) => repass === req.body.password).withMessage('Passwords don\'t match'),
    body('password').isLength({ max: 20 }).withMessage('Address should be at most 20 characters long'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const token = await register(req.body.username, req.body.password, req.body.address);

            res.cookie('token', token);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            const errors = parseError(error);
            res.render('register', {
                title: 'register Page',
                errors,
                body: {
                    username: req.body.username,
                    address: req.body.address
                },
            });
        }
    });

module.exports = authController;