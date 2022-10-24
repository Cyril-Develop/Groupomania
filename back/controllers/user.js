const dbConnection = require('../db/mysql.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cryptojs = require('crypto-js');
const User = require('../models/User.js');

exports.signup = (req, res) => {
    //encrypt the email
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, `${process.env.PASSWORD_CRYPTOJS}`).toString();
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		const user = new User ({
			email: emailCrypt,
			password: hash,
			lastname: req.body.lastname,
			firstname: req.body.firstname,
			role: req.body.role ? req.body.role : "user"
		});
		if(user.email === '' || user.password === '' || user.lastname === '' || user.firstname === ''){
			return res.status(400).json({error: 'Please complete all fields !'});
		}
		//Send the user to the database
        dbConnection.query('INSERT INTO users SET ?', user, (err, result) => {
            if(err) res.status(400).json({error: 'Email already used !'});
            else res.status(201).json({message: 'User created !'});
        });
    })
    	.catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
    //Decrypt the email
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, `${process.env.PASSWORD_CRYPTOJS}`).toString();
    //Get user from the database
	dbConnection.query('SELECT * FROM users WHERE email = ?', emailCrypt, (err, result) => {
		//if(err) throw err;
		if (err) res.status(500).json(err);
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



  
       