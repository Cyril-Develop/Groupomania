const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/profile', auth, admin, adminCtrl.getAllProfile);
router.get('/profile/:id', auth, admin, adminCtrl.getProfile);
router.delete('/profile/:id', auth, admin, adminCtrl.deleteProfile);
router.get('/post', auth, admin, adminCtrl.getAllPost);
router.get('/post/:id', auth, admin, adminCtrl.getPost);
router.delete('/post/:id', auth, admin, adminCtrl.deletePost);

module.exports = router;