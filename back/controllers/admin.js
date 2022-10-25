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
        dbConnection.query('SELECT imageUrl FROM users WHERE id = ?', req.params.id, (err, result) => {
            if (result[0].imageUrl === `http://localhost:3000/images/profilPictures/defaultPicture.jpg`) {
                dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
                    if (err) res.status(500).json(err);
                    res.status(200).json({message: 'User deleted !'});
                });
            } else {
                const profilPicture = result[0].imageUrl.split('/images/')[1];
                fs.unlink(`images/${profilPicture}`, () => {
                    dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
                        if (err) res.status(500).json(err);
                        res.status(200).json({message: 'User deleted !'});
                }); 
            });
        }}  
    ); 
};

exports.getAllPost = (req, res) => {
    dbConnection.query('SELECT * FROM post', (err, result) => {
        if (err) res.status(500).json(err);
        if(result == 0) {
            return res.status(404).json({message: 'Post not found !'});
        }
        res.status(200).json(result);
    });
};

exports.getPost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) res.status(500).json(err);
        if(result == 0) {
            return res.status(404).json({message: 'Post not found !'});
        }
        res.status(200).json(result);
    });
};

exports.deletePost = (req, res) => {
    dbConnection.query('DELETE FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) res.status(500).json(err);
        if(result == 0) {
            return res.status(404).json({message: 'Post not found !'});
        }
        res.status(200).json({message: 'Post deleted !'});
    });
};