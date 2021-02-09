const LoginController = require("@controllers/auth/LoginController")
const RegisterController = require("@controllers/auth/RegisterController")

module.exports = {
  ...LoginController,
  ...RegisterController
}