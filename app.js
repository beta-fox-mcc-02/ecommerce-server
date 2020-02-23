// "use strict"
if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') require("dotenv").config();

const express = require('express');
const app = express();

const Routes = require('./routes/routes.js');
const errHandler = require('./middlewares/errHandler.js');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', Routes);
app.use(errHandler);

module.exports = app;