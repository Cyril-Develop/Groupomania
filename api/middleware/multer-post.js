const multer = require('multer');

const MIME_TYPE = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/png': 'png', 
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "images/articleImages");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
});

//1000000 Bytes (1000 Ko)
module.exports = multer({storage, limits: { fileSize: 1000000 }}).single("image");