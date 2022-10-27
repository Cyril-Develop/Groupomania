const dbConnection = require('../db/mysql.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cryptojs = require('crypto-js');
const fs = require('fs');
const User = require('../models/User.js');

exports.signup = (req, res) => {
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, `${process.env.PASSWORD_CRYPTOJS}`).toString();
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		//obligation de rentrer les 4 infos
		const user = new User ({
			email: emailCrypt,
			password: hash,
			lastname: req.body.lastname,
			firstname: req.body.firstname,
			role: req.body.role ? req.body.role : "user"
		});
        dbConnection.query('INSERT INTO users SET ?', user, (err, result) => {
            if(err) res.status(400).json({error: 'Email already used !'});
            //else res.status(201).json({message: 'User created !'});
			else res.status(201).json({userId :result.insertId});
        });
    })
    	.catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, `${process.env.PASSWORD_CRYPTOJS}`).toString();
	dbConnection.query('SELECT * FROM users WHERE email = ?', emailCrypt, (err, result) => {
		if (err) return res.status(500).json(err);
		else {
			if(result == 0){
				return res.status(404).json({error: 'User not found !'});
			} else {
				bcrypt.compare(req.body.password, result[0].password)
					.then(valid => {
						if(!valid){
							return res.status(401).json({error: 'Incorrect password !'});
						}
						res.status(200).json({
							userId : result[0].id,
							token : jwt.sign({userId: result[0].id}, `${process.env.PASSWORD_JWT}`, {expiresIn: "24h"})
						});
					})
					.catch(error => res.status(500).json({error}));
			}
		}
	}
)};

//Récupérer toutes les infos d'un user
exports.userInfos = (req, res) => {
	dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {  
        const dataUser = {
            lastname: result[0].lastname,
            firstname: result[0].firstname,
            imageUrl: result[0].imageUrl
        }
		res.status(200).json(dataUser);
	});
};

//Supprimer le compte d'un user
exports.deleteAccount = (req, res) => {
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
           if (result[0].imageUrl === `http://localhost:3000/images/profilePictures/defaultPicture.jpg`) {
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

exports.editPicture = (req, res) => {
	dbConnection.query('SELECT imageUrl FROM users WHERE id = ?', req.params.id, (err, result) => {
        if (result[0].imageUrl !== `http://localhost:3000/images/profilePictures/defaultPicture.jpg`) {
            const filename = result[0].imageUrl.split('/images/')[1];
             fs.unlink(`images/${filename}`, () => {
                 dbConnection.query('UPDATE users SET imageUrl = ? WHERE id = ?', [`${req.protocol}://${req.get('host')}/images/profilePictures/${req.file.filename}`, req.params.id], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json({message: 'Updated profile picture !'});
             }) 
        })} else {
            dbConnection.query('UPDATE users SET imageUrl = ? WHERE id = ?', [`${req.protocol}://${req.get('host')}/images/profilePictures/${req.file.filename}`, req.params.id], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json({message: 'Updated profile picture !'});
            }) 
    }});      
};


  
       