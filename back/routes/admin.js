const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/profile', auth, admin, adminCtrl.getAllProfile);
router.get('/profile/:id', auth, admin, adminCtrl.getProfile);
router.delete('/profile/:id', auth, admin, adminCtrl.deleteProfile);
router.get('/post', admin, adminCtrl.getAllPost);
router.get('/post/:id', admin, adminCtrl.getPost);
router.delete('/post/:id', admin, adminCtrl.deletePost);

module.exports = router;