const JWT = require('jsonwebtoken')
const User = require('../../models/User')
const { use } = require('../../routes/auth/auth')
const Employee = require('../../models/Employee')

module.exports = {
  async register(req, res) {
    try {
      if (!(req.body.email || req.body.password))
        return res.status(400).json({
          status: false,
          data: {},
          message: "Email Password is required"
        })
      let user = await User.getUserByEmail(req.body)
      console.log(user);
      if (user.status)
        return res.status(400).json({
          status: false,
          data: {},
          message: "Email already exists"
        })
      let register = await new User(req.body).save()
      req.body.userId = register._id
      let employee = await new Employee(req.body).save()
      return res.json({
        status: true,
        data: employee,
        message: "Register successfully"
      })
    } catch (error) {
      console.log(error)
    }
  }
}