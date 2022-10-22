const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

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
const profileRoutes = require('./routes/profile')
const adminRoutes = require('./routes/admin');

app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;