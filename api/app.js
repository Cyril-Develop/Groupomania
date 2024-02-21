const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(morgan('dev'));

require('./db/mysql');

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site" }
}));

const limiter = rateLimit({
    window: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/groupomania/api/user', userRoutes);
app.use('/groupomania/api/post', postRoutes);
app.use('/groupomania/api/images', express.static(path.join(__dirname, 'images')));

module.exports = app;