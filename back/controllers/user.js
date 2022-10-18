const dbConnection = require('../db/mysql.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
//const User = require('../models/User.js');

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			const user = {
				email: req.body.email,
				password: hash
		};
		//Send the user to the database
       dbConnection.query('INSERT INTO user SET ?', user, (err, result) => {
		   if(err) throw err;
		   res.status(201).json({ message: 'User created !'});
	   });
    })
    	.catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
	//Find the user in the database
	dbConnection.query('SELECT * FROM user WHERE email = ?', req.body.email, (err, result) => {
		if(err) throw err;
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
							message: 'User logged in !',
							userId: result[0].id,
							token: jwt.sign({userId: result[0].id}, `${process.env.PASSWORD_JWT}`, {expiresIn: "24h"})
						});
					})
					.catch(error => res.status(500).json({error}));
			}
		}
	}
)};

  
       