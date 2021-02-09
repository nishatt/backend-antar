var express = require('express');
var router = express.Router();
const UserController = require("@controllers/user/UserController")
const AuthMiddleware = require("@middleware/AuthMiddleware")

/* GET home page. */
router.post('/list', AuthMiddleware, UserController.getUserList)

module.exports = router;
