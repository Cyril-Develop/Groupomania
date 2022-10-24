const dbConnection = require('../db/mysql.js');
const fs = require('fs');

exports.getAllProfile = (req, res) => {
    dbConnection.query('SELECT * FROM users', (err, result) => {
        if (err) res.status(500).json(err);
        res.status(200).json(result);
    });
};

exports.getProfile = (req, res) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) res.status(500).json(err);
        res.status(200).json(result);
    });
};

exports.deleteProfile = (req, res) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if(result == 0) res.status(400).json({error: 'Invalid request !'});
        else {
            const filename = result[0].imageUrl.split('/images/')[1];
            if (filename !== "defaultPicture.jpg"){
                fs.unlink(`images/${filename}`, () => {
                    dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
                        if(err) throw err;
                        res.status(200).json({message: 'User deleted !'});
                    });
                });   
            }
        }
    });	
};

exports.getAllPost = (req, res) => {};

exports.getPost = (req, res) => {};

exports.deletePost = (req, res) => {};