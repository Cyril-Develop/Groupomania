const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');
const auth = require('../middleware/auth');

router.get('/:id', auth, profileCtrl.getprofile);
router.delete('/:id', auth, profileCtrl.deleteprofile);
router.put(':id', auth, profileCtrl.editProfile);

module.exports = router;