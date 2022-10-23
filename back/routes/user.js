const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const email = require('../middleware/email');
const multer = require('../middleware/multer');

router.post('/signup', password, email, multer, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;