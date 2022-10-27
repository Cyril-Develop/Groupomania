const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middleware/password-control');
const email = require('../middleware/email-control');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');
const multer = require('../middleware/multer');

router.post('/signup', password, email, userCtrl.signup);
router.post('/login', userCtrl.login);
//router.get('/logout', userCtrl.logout);

//Récupérer toutes les infos d'un user pour les affichers dans le profil
router.get('/:id', auth, userCtrl.userInfos);

//Modifier la photo de profil d'un utilisateur si c'est son compte ou si c'est l'admin
router.put('/edit/:id', auth, permission, multer, userCtrl.editPicture);

//Supprimer le compte utilisateur si c'est son compte ou si c'est l'admin
router.delete('/delete/:id', auth, permission, multer, userCtrl.deleteAccount);

module.exports = router;