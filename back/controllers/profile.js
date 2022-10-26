const dbConnection = require('../db/mysql.js');
const fs = require('fs');

exports.getProfile = (req, res) => {
	dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {  
        const dataUser = {
            lastname: result[0].lastname,
            firstname: result[0].firstname,
            imageUrl: result[0].imageUrl
        }
		res.status(200).json(dataUser);
	});
};

exports.deleteProfile = (req, res) => {
    //Delete all posts images from directory
    dbConnection.query('SELECT imageUrl FROM post WHERE userId = ?', req.params.id, (err, result) => {
        if(result == 0) return res.status(400).json({message: 'No post image to delete !'});
        result.forEach(image => {
            const filename = image.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                if (err) return res.status(500).json(err);
            }
        )})
    });
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
};

exports.editProfile = (req, res) => {
    dbConnection.query('SELECT imageUrl FROM users WHERE id = ?', req.params.id, (err, result) => {
        if (result[0].imageUrl !== `http://localhost:3000/images/profilPictures/defaultPicture.jpg`) {
            const filename = result[0].imageUrl.split('/images/')[1];
             fs.unlink(`images/${filename}`, () => {
                 dbConnection.query('UPDATE users SET imageUrl = ? WHERE id = ?', [`${req.protocol}://${req.get('host')}/images/profilPictures/${req.file.filename}`, req.params.id], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json({message: 'Updated profile picture !'});
             }) 
        })} else {
            dbConnection.query('UPDATE users SET imageUrl = ? WHERE id = ?', [`${req.protocol}://${req.get('host')}/images/profilPictures/${req.file.filename}`, req.params.id], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json({message: 'Updated profile picture !'});
            }) 
    }});      
};   

    
    
        

        

    
            
       
            
        
    