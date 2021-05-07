var express = require('express');
var router = express.Router();
var customerController = require('../controllers/customer.controller.js')
var  middleware = require('../utils/auth.middleware');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register',function(req,res,next){
  res.render('register');
});

router.post('/cart', middleware.loggedIn,middleware.isCustomer,customerController.addToCart);
router.get('/cart',middleware.loggedIn,middleware.isCustomer,customerController.showCart);
router.post('/cart/clear',middleware.loggedIn,middleware.isCustomer,customerController.clearCart);
router.post('/buy', middleware.loggedIn,middleware.isCustomer,customerController.buy);

module.exports = router;
