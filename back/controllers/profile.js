const dbConnection = require('../db/mysql.js');
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');

exports.getprofile = (req, res) => {
	dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if (err) throw err;
		if(result == 0){
            res.status(400).json({error: 'Invalid request !'});
        }; 
		res.status(200).json(result[0]);
	});
};

exports.deleteprofile = (req, res) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if(result == 0) res.status(400).json({error: 'Invalid request !'});
        else {
            dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
                if(err) throw err;
                else res.status(200).json({message: 'User deleted !'});
            });
        }
    });	
};

//***************  Fonctionne pas *********************//
exports.editProfile = (req, res) => {
    if(req.auth.userId != req.params.id){
        res.status(400).json({error: 'Invalid request !'});
    } else {
        //console.log(req.body)
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const editProfile = {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: cryptojs.HmacSHA256(req.body.email, `${process.env.PASSWORD_CRYPTOJS}`).toString(),
                    password: hash
            }
        dbConnection.query('UPDATE users SET ? WHERE id = ?', [editProfile, req.params.id], (err, result) => {
            if(err) throw err;
            else res.status(200).json({message: 'User updated !'});
        });
    })
        .catch(error => res.status(500).json({error}));
    }
};