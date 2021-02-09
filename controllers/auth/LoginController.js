const JWT = require('jsonwebtoken')
const User = require('@models/User')

module.exports = {
  async login(req, res) {
    try {
      if (!(req.body.email || req.body.password))
        return res.json({
          status: false,
          data: {},
          message: "Email Password is required"
        })
      let user = await User.checkUser(req.body)
      if (!user.status)
        return res.status(400).json({
          status: false,
          data: {},
          message: "Email or Password is incorrect"
        })
       user = user.data
       let isPasswordCorrect = await user.passwordMatches(req.body.password)
       if (!isPasswordCorrect)
       return res.json({
         status: false,
         data: {},
         message: "Email or Password is incorrect"
       })
      let generateToken  = await user.generateToken()
      return res.json({
        status: true,
        data: {token: generateToken},
        message: "Login successfully"
      })
    } catch (error) {
      console.log(error)
    }
  }
}