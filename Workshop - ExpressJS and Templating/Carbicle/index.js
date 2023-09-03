// [x] initialize and configure Express app
// [x] initialize templating lib
// [ ] create home controller
// [x] bind routing
// [x] create layout
// create data service
// - [ ] read all
// - [ ] read one by Id
// - [ ] create
// - [ ] search
// - [ ] edit
// - [ ] delete
// implement controllers
// - [ ] home (catalog)
// - [ ] about
// - [ ] details
// - [ ] create
// - [ ] improved home (search)
// - [ ] edit
// - [ ] delete
// [ ] add front-end code

const expresss = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/cars')

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

app.get('/about', about);

app.all('*', notFound);


app.listen(3000, () => console.log('Server started on port 3000'));