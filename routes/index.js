var express = require('express');
var router = express.Router();
var AuthRoute = require("@routes/auth")
var UserRoute = require("@routes/user")

router.use('/auth', AuthRoute)
router.use('/user', UserRoute)

// router.use('/auth', 
module.exports = router;
