const addController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/addService");
const { parseError } = require("../util/parser");

addController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

addController.post('/create', hasUser(), async (req, res) => {
    const add = {
        headline: req.body.headline,
        location: req.body.location,
        company: req.body.company,
        description: req.body.description,
        owner: req.user._id,
        authorEmail: req.user.email
    };

    try {
        await create(add);
        res.redirect('/catalog');
    } catch (error) {
        console.error(error);
        const errors = parseError(error);
        res.render("create", {
            title: "Create Page",
            errors,
            add
        });
    }
});

module.exports = addController;