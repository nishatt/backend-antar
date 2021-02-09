var express = require('express');
var router = express.Router();
// var AuthRoute = require("./auth/")

/* GET home page. */
router.get('/list', function (req, res, next) {
  res.send("user page")
  // res.render('index', { title: 'Express' });
});


// router.use('/auth', 
module.exports = router;
