const { hasUser } = require("../middlewares/guards");
const { create, getById } = require("../services/auctionService");
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

auctionController.get('/:id', hasUser(), async (req, res) => {
    const auction = await getById(req.params.id);

    if (req.user) {
        auction.isOwner = req.user._id.toString() === auction.owner.toString();
    }
    if (auction.bidder) {
        auction.hasBid = auction.bidder._id == req.user._id;
    }

    res.render('details', { title: 'Details', auction })
});

module.exports = auctionController;