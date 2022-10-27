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
     //Delete all posts images from directory
     dbConnection.query('SELECT imageUrl FROM post WHERE userId = ?', req.params.id, (err, result) => {
        result.forEach(image => {
            const filename = image.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                if (err) return res.status(500).json(err);
            })
        })
    //Delete user and all his posts from database
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
     }}); 
    })
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

exports.editPost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
                const image = req.file ? `${req.protocol}://${req.get('host')}/images/articleImages/${req.file.filename}` : '';
                const title = req.body.title ? req.body.title : result[0].title;
                const content = req.body.content ? req.body.content : result[0].content;
            if (result[0].imageUrl !== "") {
                const filename = result[0].imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    dbConnection.query('UPDATE post SET imageUrl = ?, title = ?, content = ?  WHERE id = ?', [image, title, content, req.params.id], (err, result) => {
                        if (err) return res.status(500).json(err);
                        res.status(200).json({message: 'Post updated !'});
                    });
                });
            } else {
                dbConnection.query('UPDATE post SET imageUrl = ?, title = ?, content = ?  WHERE id = ?', [image, title, content, req.params.id], (err, result) => {
                        if (err) return res.status(500).json(err);
                        res.status(200).json({message: 'Post updated !'});
            });
        }
    }); 
};