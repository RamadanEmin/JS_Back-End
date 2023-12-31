const authController = require("../controllers/authController");
const cryptoController = require("../controllers/cryptoController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
    app.use("/", homeController);
    app.use("/auth", authController);
    app.use("/crypto", cryptoController);

    app.use((req, res, next) => {
        res.render('404', { title: 'Error Page' });
    });
};
