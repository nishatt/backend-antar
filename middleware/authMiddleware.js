const JWT = require('jsonwebtoken')
const User = require('../../models/User')

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.header["authoriaztion"]
    if (!bearerHeader)
      return res
        .status(401)
        .json({
          status: false,
          message: "Access Dednied. Token required"
        })
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]
    if (!token)
      return res
        .status(401)
        .json({
          status: false,
          message: "Access Dednied. Token required"
        })
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decode
    //- add if user registered or not
    next()
  }
  catch (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: error
      })
  }
}