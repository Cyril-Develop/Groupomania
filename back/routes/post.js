const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multerPost = require('../middleware/multer-post');
const permissionPost = require('../middleware/permission-post');

router.post('/', auth, multerPost, postCtrl.createPost);

router.get('/', auth, postCtrl.getAllPost);

router.get('/:id', auth, postCtrl.getPost);

router.delete('/:id', auth, permissionPost, postCtrl.deletePost);

router.put('/:id', auth, permissionPost, multerPost, postCtrl.editPost);

router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;