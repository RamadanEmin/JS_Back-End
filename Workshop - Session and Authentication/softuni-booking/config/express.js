const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
}