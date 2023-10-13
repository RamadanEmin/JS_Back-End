const { hasUser } = require("../middlewares/guards");
const { create, getById } = require("../services/bookService");
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

bookController.get('/:id', async (req, res) => {
    const book = await getById(req.params.id);

    if (req.user) {
        book.isOwner = book.owner.toString() === req.user._id.toString();
        book.isWish = book.wishingList.map(w => w.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details Page', book });
});

module.exports = bookController;