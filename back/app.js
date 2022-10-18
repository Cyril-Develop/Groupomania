const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Connection to the database
require('./db/mysql');

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}));

//Routes
const userRoutes = require('./routes/user');

app.use('/api/auth', userRoutes);


module.exports = app;