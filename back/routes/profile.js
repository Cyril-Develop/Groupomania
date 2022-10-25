const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const userPermission = require('../middleware/userPermission');

router.get('/:id', auth, userPermission, profileCtrl.getProfile);
router.delete('/:id', auth, userPermission, multer, profileCtrl.deleteProfile);
router.put('/:id', auth, userPermission, multer, profileCtrl.editProfile);

module.exports = router;