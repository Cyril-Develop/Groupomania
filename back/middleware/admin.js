const dbConnection = require('../db/mysql.js');

module.exports = (req, res, next) => {
    dbConnection.query('SELECT role FROM users WHERE id = ?', req.auth.userId, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result == 0 || result[0].role !== 'admin') {
            return res.status(403).json({ message: 'Access denied !'});
        } else {
            next();
        }
    })
};