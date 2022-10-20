const dbConnection = require('../db/mysql.js');

exports.getprofile = (req, res) => {
	dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
		if(err) res.status(404).json({err});
		else res.status(200).json(result[0]);
	});
};

exports.deleteprofile = (req, res) => {
	dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
		if(err) res.status(400).json({err: 'Delete failed !'});
		else res.status(200).json({message: 'User deleted !'});
	});
};

exports.editProfile = (req, res) => {

};