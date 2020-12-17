// modules importation
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use(require('./routes/user'));

// production settings
if (process.env.NODE_ENV == "production") {
    app.use(express.static('app/build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'));
    });
};

// settings
app.set('port', process.env.PORT || 5000);

module.exports = app;