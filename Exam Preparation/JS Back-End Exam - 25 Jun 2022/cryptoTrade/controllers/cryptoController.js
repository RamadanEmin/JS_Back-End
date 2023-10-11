const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/cryptoService");
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

module.exports = cryptoController;