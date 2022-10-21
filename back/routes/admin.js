const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

router.get('/profile', adminCtrl.getProfiles);
router.get('/profile/:id', adminCtrl.getProfile);
router.delete('/profile/:id', adminCtrl.deleteProfile);
//router.get('/message', adminCtrl.getMessages)');
//router.get('/message/:id', adminCtrl.getMessage);
//router.delete('/message/:id', adminCtrl.deleteMessage);

module.exports = router;