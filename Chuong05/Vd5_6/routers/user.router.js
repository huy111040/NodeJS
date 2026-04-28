var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');

router.get('/', controller.index);
router.get('/users', controller.user);
router.get('/users/search', controller.search);

module.exports = router;
