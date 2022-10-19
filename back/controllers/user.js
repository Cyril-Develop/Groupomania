const dbConnection = require('../db/mysql.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User.js');

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			const user = new User ({
				email: req.body.email,
				password: hash,
				lastname: req.body.lastname,
				name: req.body.name,
				isAdmin: 0
		});
		//Send the user to the database
       dbConnection.query('INSERT INTO users SET ?', user, (err, result) => {
		   if(err) res.status(400).json({message: 'Email already used !'});
		   else res.status(201).json({ message: 'User created !'});
	   });
    })
    	.catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
	//Find the user in the database
	dbConnection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, result) => {
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
							userId : result[0].id,
							email : result[0].email,
							lastname : result[0].lastname,
							name : result[0].name,
							token : jwt.sign({userId: result[0].id}, `${process.env.PASSWORD_JWT}`, {expiresIn: "24h"})
						});
					})
					.catch(error => res.status(500).json({error}));
			}
		}
	}
)};

exports.getOneUser = (req, res) => {
	dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
		if(err) res.status(404).json({err});
		else res.status(200).json(result[0]);
	});
};

exports.deleteUser = (req, res) => {
	dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
		if(err) res.status(400).json({err: 'Delete failed !'});
		else res.status(200).json({message: 'User deleted !'});
	});
};

  
       