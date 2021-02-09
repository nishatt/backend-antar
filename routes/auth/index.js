const express = require('express');
const router = express.Router();
const Responder = require("@service/Responder")
const Validation = require("@validations/AuthValidation")

const AuthController = require("@controllers/auth/index")

router.post('/login',
  Validation.login(),
  Responder.validate.bind(Responder),
  AuthController.login
)
router.post('/register',
  Validation.register(),
  Responder.validate.bind(Responder),
  AuthController.register
)

module.exports = router;
