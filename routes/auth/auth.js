const express = require('express');
const router = express.Router();
const AuthController = require("../../controller/auth/index")
// var AuthRoute = require("./auth/")

/* GET home page. */
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
// router.get('/register', function (req, res, next) {
//   res.send("login page")
//   // res.render('index', { title: 'Express' });
// });

// router.use('/auth', 
module.exports = router;
