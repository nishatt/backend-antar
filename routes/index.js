var express = require('express');
var router = express.Router();
var AuthRoute = require("./auth/auth")
var UserRoute = require("./user/user")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', AuthRoute)
router.use('/user', UserRoute)

// router.use('/auth', 
module.exports = router;
