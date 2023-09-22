const mongoose = require('mongoose');
const express = require('express');

async function start() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/furniture2');

        console.log('DB Ready');
    } catch (err) {
        console.log('Error connecting to database');
        return process.exit(1);
    }

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.listen(3030, () => console.log('REST Service started on port 3030'));
}


start();