const authController = require('express').Router();
const { register } = require('../services/userService');
const { parseError } = require('../util/parser');
const validator = require('validator');


authController.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register Page'
  });
});

authController.post('/register', async (req, res) => {
  try {
    if (validator.isEmail(req.body.email) === false) {
      throw new Error('Invalid email');
    }
    if (req.body.username === '' || req.body.password === '') {
      throw new Error('All fields are required');
    }
    if (req.body.password.length < 5) {
      throw new Error('Password must be at least 5 characters long');
    }
    if (req.body.password !== req.body.repass) {
      throw new Error('Passwords don\'t match');
    }

    const token = await register(req.body.email, req.body.username, req.body.password);

    res.cookie('token', token);
    res.redirect('/');
  } catch (error) {
    const errors = parseError(error);

    res.render('register', {
      title: 'Register Page',
      errors,
      body: {
        email: req.body.email,
        username: req.body.username
      }
    });
  }
});

module.exports = authController;