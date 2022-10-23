const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/profile', auth, admin, adminCtrl.getAllProfile);
router.get('/profile/:id', auth, admin, adminCtrl.getProfile);
router.delete('/profile/:id', auth, admin, adminCtrl.deleteProfile);
//router.get('/message', adminCtrl.getMessages)');
//router.get('/message/:id', adminCtrl.getMessage);
//router.delete('/message/:id', adminCtrl.deleteMessage);

module.exports = router;