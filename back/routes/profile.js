const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/:id', auth, profileCtrl.getprofile);
router.delete('/:id', auth, multer, profileCtrl.deleteprofile);
router.put('/:id', auth, multer, profileCtrl.editProfile);

module.exports = router;