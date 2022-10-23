const dbConnection = require('../db/mysql.js');

module.exports = (req, res, next) => {
    dbConnection.query('SELECT role FROM users WHERE id = ?', req.auth.userId, (err, result) => {
        if(err) throw err;
        if(result[0].role === "admin") {
            next();
        }
        else {
            return res.status(403).json({ message: 'Access denied !'});
        }
    })
};