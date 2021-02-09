var express = require('express');
var router = express.Router();
const UserController = require("../../controller/user/UserContoller")
const AuthMiddleware = require("../../middleware/authMiddleware")


/* GET home page. */
router.post('/list', AuthMiddleware, UserController.getUserList)


// router.use('/auth', 
module.exports = router;
