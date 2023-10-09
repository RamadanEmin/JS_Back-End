const { isGuest } = require('../middlewares/guards');
const { register } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page',
    });
});

authController.post('/register', isGuest(), async (req, res) => {
    console.log(req.body);
    try {
        if (/[a-z]+\@[a-z]+\.[a-z]+/.test(req.body.email) === false) {
            throw new Error('Invalid email!');
        }
        if (req.body.password.length < 5) {
            throw new Error('Password have to be at least 5 characters');
        }
        if (req.body.firstName.length < 1) {
            throw new Error('First Name have to be at least 1 characters');
        }
        if (req.body.lastName.length < 1) {
            throw new Error('Last Name have to be at least 1 characters');
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Password don\'t match');
        }
        const token = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },
        });
    }
});

module.exports = authController;
