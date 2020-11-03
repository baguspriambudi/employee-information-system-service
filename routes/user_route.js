const express = require('express');

const schema = require('../middleware/schema');
const userController = require('../controller/user');

const router = express.Router();
router.post('/create', schema.midUser, userController.createuser);
router.post('/login', schema.midUser, userController.login);

module.exports = router;
