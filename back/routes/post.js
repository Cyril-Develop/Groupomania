const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/:id', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getAllPost);
router.get('/:id/:id', auth, postCtrl.getPost);
router.delete('/:id/:id', auth, postCtrl.deletePost);
router.put('/:id/:id', auth, multer, postCtrl.editPost);

module.exports = router;