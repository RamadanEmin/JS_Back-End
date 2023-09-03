// [x] initialize and configure Express app
// [x] initialize templating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [ ] read one by Id
// - [ ] create
// - [x] search
// - [ ] edit
// - [ ] delete
// implement controllers
// - [x] home (catalog)
// - [ ] about
// - [ ] details
// - [ ] create
// - [x] improved home (search)
// - [ ] edit
// - [ ] delete
// [ ] add front-end code

const expresss = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/cars')

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');

const { notFound } = require('./controllers/notFound');

const app = expresss();

app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

app.use(expresss.urlencoded({ extended: true }));
app.use('/static', expresss.static('static'));
app.use(carsService());

app.get('/', home);
app.get('/about', about);

app.all('*', notFound);


app.listen(3000, () => console.log('Server started on port 3000'));