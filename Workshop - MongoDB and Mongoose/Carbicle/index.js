// [x] initialize and configure Express app
// [x] initialize templating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [x] search
// - [x] edit
// - [x] delete
// - [x] accessory read
// - [x] accessory create
// - [x] attach accessory
// implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improved home (search)
// - [x] edit
// - [x] delete
// - [x] create accessory
// - [x] attach accessory to car
// - [x] update details to include accessory
// [x] add front-end code
// [x] add database connection
// [x] create Car model
// [x] upgrade car service to use Car model
// [x] add validation rules to Car model
// [x] create Accessory model

const expresss = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index');

const carsService = require('./services/cars')
const accessoryService = require('./services/accessory')

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');

const { notFound } = require('./controllers/notFound');

main();

async function main() {
    await initDb();

    const app = expresss();

    app.engine('.hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', '.hbs');

    app.use(expresss.urlencoded({ extended: true }));
    app.use('/static', expresss.static('static'));
    app.use(carsService());
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.route('/create').get(create.get).post(create.post);
    app.route('/edit/:id').get(edit.get).post(edit.post);
    app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);
    app.route('/accessory').get(accessory.get).post(accessory.post);
    app.route('/attach/:id').get(attach.get).post(attach.post);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}