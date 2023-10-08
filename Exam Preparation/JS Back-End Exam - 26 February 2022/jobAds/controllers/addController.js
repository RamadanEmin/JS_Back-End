const addController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { create, getById } = require("../services/addService");
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

addController.get('/:id', async (req, res) => {
    const add = await getById(req.params.id);

    if (req.user) {
        add.isOwner = req.user._id.toString() === add.owner._id.toString();
        add.hasApplied = add.users.map(u => u._id.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details Page', add });
});

addController.get('/:id/edit', hasUser(), async (req, res) => {
    const add = await getById(req.params.id);

    if (add.owner._id.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    res.render('edit', { title: 'Edit page', add });
});

addController.post('/:id/edit', hasUser(), async (req, res) => {
    const add = await getById(req.params.id);

    if (add.owner._id.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    try {
        await update(req.params.id, req.body);
        res.redirect(`/add/${req.params.id}`)
    } catch (error) {
        console.error(error);
        const errors = parseError(error);
        res.render("edit", {
            title: "Edit Page",
            errors,
            add: req.body
        });
    }
});

module.exports = addController;