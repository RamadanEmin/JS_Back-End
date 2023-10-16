const { register } = require("../services/userService");

const authController = require("express").Router();

authController.get("/register", isGuest(), (req, res) => {
    res.render("register", { title: "Register Page", idStyle: 'register' });
});

authController.post("/register", isGuest(), async (req, res) => {
    try {
        if (req.body.username.length < 5) {
            throw new Error("Username must be at least five characters long");
        }
        if (req.body.email.length < 10) {
            throw new Error("Email must be at least ten characters long");
        }
        if (req.body.password.length < 4) {
            throw new Error("Email must be at least four characters long");
        }
        if (req.body.password != req.body.repass) {
            throw new Error("Password don't match");
        }
        const token = await register(req.body.email, req.body.username, req.body.password);

        res.cookie("token", token);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render("register", {
            title: "Register Page",
            idStyle: 'register',
            errors,
            body: {
                email: req.body.email,
                username: req.body.username
            },
        });
    }
});

module.exports = authController;
