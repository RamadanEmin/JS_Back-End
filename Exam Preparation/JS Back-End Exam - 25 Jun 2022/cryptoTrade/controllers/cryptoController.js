const { hasUser } = require("../middlewares/guards");
const { create, getById } = require("../services/cryptoService");
const { parseError } = require("../util/parser");

const cryptoController = require("express").Router();

cryptoController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create' });
});

cryptoController.post('/create', hasUser(), async (req, res) => {
    const crypto = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        payment: req.body.payment,
        owner: req.user._id
    };

    try {
        await create(crypto);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create',
            errors,
            crypto
        });
    }
});

cryptoController.get('/:id', async (req, res) => {
    const crypto = await getById(req.params.id);

    if (req.user) {
        crypto.isOwner = crypto.owner.toString() === req.user._id.toString();
        crypto.hasBought = crypto.buyers.map(b => b.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details', crypto });
});

module.exports = cryptoController;