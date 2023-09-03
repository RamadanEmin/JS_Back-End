const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);

        return JSON.parse(file);
    } catch (err) {
        console.log('Database read error');
        console.log(err);
        process.exit(1);
    }
};

async function getAll(query) {
    const data = await read();

    let cars = Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }
    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }

    return cars;
};

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
    };
    next();
};