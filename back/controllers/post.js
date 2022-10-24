const Post = require('../models/post.js');
const dbConnection = require('../db/mysql');

exports.createPost = (req, res) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if (err)  res.status(500).json(err);
        if(req.auth.userId != req.params.id || result == 0) res.status(400).json({error: 'Invalid request !'});
        else {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                userId: req.params.id,
                imageUrl: req.body.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''
            });
        dbConnection.query('INSERT INTO post SET ? ', post, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({message: 'Post created !'});
       });
    }});
};
    
//modifier pour pouvoir récupérer un id de post
exports.getAllPost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE userId = ?', req.params.id, (err, result) => {
        if (err) res.status(500).json(err);
        if(req.auth.userId != req.params.id || result == 0) res.status(400).json({error: 'Invalid request !'});
        else res.status(200).json(result);
    });
};

exports.getPost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) res.status(500).json(err);
        if(req.auth.userId != result[0].userId || result == 0) res.status(400).json({error: 'Invalid request !'});
        else res.status(200).json(result);
    });    
}

exports.deletePost = (req, res) => {};

exports.editPost = (req, res) => {};