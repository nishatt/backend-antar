let { body } = require('express-validator')

module.exports = {

  login() {
    return [
      body('email', 'Email is required').exists().isEmail().withMessage("Please provide valid email id"),
      body('password', 'Password is required').exists()
      .isLength({
          min: 6
      }).withMessage(`password must be 6 characters`),
    ]
  },
  register() {
    return [
      body('email', 'Email is required').exists().isEmail().withMessage("Please provide valid email id"),
      body('password', 'Password is required').exists()
      .isLength({
          min: 6
      }).withMessage(`password must be 6 characters`),
      body('fullName', 'Full Name is required').exists(),
      body('lastName', 'Last Name is required').exists(),
      body('organisationName', 'Organisation Name is required').exists(),
    ]
  }
}