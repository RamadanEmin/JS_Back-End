const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/auctionService");
const { parseError } = require("../util/parser");

const auctionController = require("express").Router();

auctionController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create' });
});

auctionController.post('/create', hasUser(), async (req, res) => {
    const auction = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        owner: req.user._id,
        author: `${req.user.firstName} ${req.user.lastName}`
    };

    try {
        await create(auction);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create',
            errors,
            auction
        });
    }
});

module.exports = auctionController;