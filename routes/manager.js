var express = require('express');
var router = express.Router();
var  middleware = require('../utils/auth.middleware');
var managerController = require('../controllers/manager.controller.js')
router.get('/',managerController.dashboard);
router.post('/addDish',middleware.loggedIn,middleware.isManager,managerController.addDish);
// router.post('/update',managerController.update);

// router.post('/*',customerController.getMenu);



module.exports = router;