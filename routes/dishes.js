var express = require('express');
var router = express.Router();
var  middleware = require('../utils/auth.middleware');

var dishController = require('../controllers/dish.controller.js')
router.get('/', dishController.getDishes);

// router.post('/*',customerController.getMenu);



module.exports = router;