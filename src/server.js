const express = require('express');
const mongoose = require('mongoose');

const { mongoConnect, mongoDisconnect } = require('./services/mongo');
const router = require('./routes/router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/', router)

async function startServer() {
    try {
        await mongoConnect();
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}.`);
        });
    }
    catch (err) {
        console.log(err);
        await mongoDisconnect();
    }
};

startServer();