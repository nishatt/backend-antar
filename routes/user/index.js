const express = require('express');
const router = express.Router();
const Responder = require("@service/Responder")

const UserController = require("@controllers/user/UserController")
const AuthMiddleware = require("@middleware/AuthMiddleware")

/* GET home page. */
router.post('/list', AuthMiddleware,
UserController.getUserList)

module.exports = router;
