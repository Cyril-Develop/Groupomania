const Post = require('../models/post.js');
const dbConnection = require('../db/mysql');
const fs = require('fs');

exports.createPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        userId: req.params.id,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/articleImages/${req.file.filename}` : ''
    });
    dbConnection.query('INSERT INTO post SET ? ', post, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({message: 'Post created !'});
    });
};
    
exports.getAllPost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE userId = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result);
    });
};

exports.getPost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result[0]); 
    });    
}

exports.deletePost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        else {
            const filename = result[0].imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            dbConnection.query('DELETE FROM post WHERE id = ?', req.params.id, (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'Post deleted !'});
            });
        })}
    });  
};

 exports.editPost = (req, res) => {
     dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
            if (result[0].imageUrl !== "") {
                const filename = result[0].imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    dbConnection.query('UPDATE post SET imageUrl = ?, title = ?, content = ?  WHERE id = ?', [`${req.protocol}://${req.get('host')}/images/articleImages/${req.file.filename}`, req.body.title, req.body.content, req.params.id], (err, result) => {
                        if (err) return res.status(500).json(err);
                        res.status(200).json({message: 'Post updated !'});
                    });
                });
            } else {
                dbConnection.query('UPDATE post SET imageUrl = ?, title = ?, content = ?  WHERE id = ?', [`${req.protocol}://${req.get('host')}/images/articleImages/${req.file.filename}`, req.body.title, req.body.content, req.params.id], (err, result) => {
                        if (err) return res.status(500).json(err);
                        res.status(200).json({message: 'Post updated !'});
            });
        }
    }); 
};
