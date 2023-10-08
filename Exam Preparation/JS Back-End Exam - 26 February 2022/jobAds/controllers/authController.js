const { isGuest } = require("../middlewares/guards");
const { register } = require("../services/userService");
const { parseError } = require("../util/parser");

const authController = require("express").Router();

authController.get("/register",isGuest(), (req, res) => {
    res.render("register", { title: "Register Page" });
});

authController.post("/register",isGuest(), async (req, res) => {
    try {
        if (/[a-z]+\@[a-z]+\.[a-z]+/.test(req.body.email) === false) {
            throw new Error('Invalid email');
        }
        if (req.body.password.length < 5) {
            throw new Error('Password have to be at least 5 characters');
        }
        if (req.body.password != req.body.repass) {
            throw new Error("Password don't match");
        }
        if (req.body.description.length > 40) {
            throw new Error('Description have to be at most 40 characters');
        }

        const token = await register(req.body.email, req.body.password, req.body.description);

        res.cookie("token", token);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render("register", {
            title: "Register Page",
            errors,
            body: {
                email: req.body.email,
                description: req.body.description
            },
        });
    }
});

module.exports = authController;
