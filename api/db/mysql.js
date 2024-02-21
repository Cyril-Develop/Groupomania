require('dotenv').config();
const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    database : `${process.env.DB_NAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    authPlugin: 'mysql_native_password'
});

dbConnection.connect((err) => {
    if(err) throw err;
    console.log('Connected to the database');
});

module.exports = dbConnection;
