const dbConnection = require('../db/mysql.js');
const fs = require('fs');

exports.getprofile = (req, res) => {
	dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        //if (err) throw err;
        if (err) res.status(500).json(err);
		if(req.auth.userId != req.params.id || result == 0){
            res.status(400).json({error: 'Invalid request !'});
        }  
        const dataUser = {
            lastname: result[0].lastname,
            firstname: result[0].firstname,
            imageUrl: result[0].imageUrl
        }
		res.status(200).json(dataUser);
	});
};

exports.deleteprofile = (req, res) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if(req.auth.userId != req.params.id || result == 0) res.status(400).json({error: 'Invalid request !'});
        else {
            const filename = result[0].imageUrl.split('/images/')[1];
            if (filename !== "defaultPicture.jpg"){
                fs.unlink(`images/${filename}`, () => {
                    dbConnection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
                        if(err) throw err;
                        res.status(200).json({message: 'User deleted !'});
                    });
                });   
            }
        }
    });	
};

exports.editProfile = (req, res) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if(req.auth.userId != req.params.id || result == 0){
            res.status(400).json({error: 'Invalid request !'});
        }  
        else {
            const imageUploaded = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            if (imageUploaded !== "http://localhost:3000/images/defaultPicture.jpg"){
                dbConnection.query('UPDATE users SET imageUrl = ? WHERE id = ?', [imageUploaded, req.params.id], (err, result) => {
                    if(err) throw err;
                    res.status(200).json({message: 'User updated !'});
                });
            }
        }
    })
};   

    
    
        

        

            // dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
            //     if (err) throw err;
            //     if(result == 0){
            //         res.status(400).json({error: 'Invalid request !'});
            //     }; 
            //     res.status(200).json(result[0]);
            // });
        
    
            
       
            
        
    