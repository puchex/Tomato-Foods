var express = require('express');
var router = express.Router();

// router registration and login for customer.

var customerController = require('../controllers/customer.controller.js')
router.post('/register-customer',customerController.register);

router.post('/login-customer',customerController.login);



module.exports = router;