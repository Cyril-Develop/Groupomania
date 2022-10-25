const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multerPost = require('../middleware/multer-post');
const userPermission = require('../middleware/userPermission');
const userPermissionPost = require('../middleware/userPermission-post');

router.post('/:id', auth, userPermission, multerPost, postCtrl.createPost);
router.get('/:id', auth, userPermission, postCtrl.getAllPost);
router.get('/:id/:id', auth, userPermissionPost, postCtrl.getPost);
router.delete('/:id/:id', auth, userPermissionPost, postCtrl.deletePost);
router.put('/:id/:id', auth, userPermissionPost, multerPost, postCtrl.editPost);

module.exports = router;