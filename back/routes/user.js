const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middleware/password-control');
const email = require('../middleware/email-control');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');
const multer = require('../middleware/multer-profile');

router.post('/signup', password, email, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', auth, userCtrl.logout);
router.get('/:id', auth, userCtrl.userInfos);
router.put('/edit/:id', auth, permission, multer, userCtrl.editPicture);
router.delete('/delete/:id', auth, permission, multer, userCtrl.deleteAccount);

module.exports = router;