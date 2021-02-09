const JWT = require('jsonwebtoken')
const User = require('@models/User')
const Employee = require('@models/Employee')
const Responder = require('@service/Responder')

module.exports = {
  async register(req, res) {
    try {
      let user = await User.getUserByEmail(req.body)
      if (user.status)
      return Responder.respondWithFalseSuccess(req, res, {}, 'Email already exists')
      let register = await new User(req.body).save()
      req.body.userId = register._id
      let employee = await new Employee(req.body).save()
      return Responder.respondWithSuccess(req, res, {}, 'Register successfully')
    } catch (error) {
      console.log(error)
      return Responder.respondWithError(req, res,error)
    }
  }
}