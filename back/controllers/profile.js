const dbConnection = require('../db/mysql.js');

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
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if(result == 0) res.status(400).json({error: 'Invalid request !'});
        else {
            dbConnection.query('UPDATE users SET ? WHERE id = ?', req.body, (err, result) => {
                if (err) throw err;
                else res.status(200).json({message: 'User updated !'});
            });
        }
    });	
};

// app.post("/post", upload.single('image'), (req, res) => {
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         console.log(req.file.filename)
//         var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
//         var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
//         db.query(insertData, [imgsrc], (err, result) => {
//             if (err) throw err
//             console.log("file uploaded")
//         })
//     }
// });