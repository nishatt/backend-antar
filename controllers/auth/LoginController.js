const JWT = require('jsonwebtoken')
const User = require('@models/User')
const Responder = require('@service/Responder')

module.exports = {
  async login(req, res) {
    try {
      let user = await User.checkUser(req.body)
      if (!user.status)
      return Responder.respondWithFalseSuccess(req, res, {}, 'Email or Password is incorrect')
       user = user.data
       let isPasswordCorrect = await user.passwordMatches(req.body.password)
      if (!isPasswordCorrect)
        return Responder.respondWithFalseSuccess(req, res, {}, 'Email or Password is incorrect')
      let generateToken  = await user.generateToken()
      return Responder.respondWithSuccess(req, res, {token: generateToken}, 'Email or Password is incorrect')
    } catch (error) {
      console.log(error)
      return Responder.respondWithError(req, res,error)
    }
  }
}