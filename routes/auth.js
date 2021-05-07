var express = require('express');
var router = express.Router();

// router registration and login for customer.

var userController = require('../controllers/user.controller.js')
router.post('/register-customer',userController.register);

router.post('/login-customer',userController.login);



module.exports = router;