// router/userRouter.js
const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/users', userController.addUser);
router.get('/users', userController.getAllUsers);
router.delete('/users/:username', userController.deleteUser);
router.patch('/users/:username/toggle-star', userController.toggleStar);

module.exports = router;
