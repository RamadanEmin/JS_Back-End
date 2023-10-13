const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/bookService");
const { parseError } = require("../util/parser");

const bookController = require("express").Router();

bookController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

bookController.post('/create', hasUser(), async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: req.body.stars,
        image: req.body.image,
        review: req.body.review,
        owner: req.user._id
    };

    try {
        await create(book);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            book
        });
    }
});

module.exports = bookController;