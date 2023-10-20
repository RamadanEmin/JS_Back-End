const authController = require('express').Router();

const { register } = require('../services/userService');

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.firstName.length < 3) {
            throw new Error('First name is required and must be at least 3 characters long');
        }
        if (req.body.lastName.length < 3) {
            throw new Error('Last name is required and must be at least 3 characters long');
        }
        if (req.body.email.length < 10) {
            throw new Error('Email is required and must be at least 10 characters long');
        }
        if (req.body.password.length < 4) {
            throw new Error('Password is required and must be at least 4 characters long');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Password don\'t match');
        }
        const token = await register(req.body.email, req.body.firstName, req.body.lastName, req.body.password);

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
                lastName: req.body.lastName
            },
        });
    }
});

module.exports = authController;