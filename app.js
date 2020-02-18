if (process.env.NODE_ENV === 'test'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./routes/user-route');
const productRoute = require('./routes/product-route');
const errorHandler = require('./middlewares/error-handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use(productRoute);
app.use(errorHandler);

module.exports = app;