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

// settings
app.set('port', process.env.PORT || 3000); 

module.exports = app;