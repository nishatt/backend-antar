const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: /\S+@\S+\.\S+/
  },
  password: {
    type: String
  }
}, {
  timestamps: true
})
UserSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next()
    const rounds = 10
    const hash = await bcrypt.hash(this.password, rounds)
    this.password = hash
    return next()
  } catch (error) {
    return next(error)
  }
})

UserSchema.method({
  generateToken(req) {
    let user = {
      fullName: this.fullName,
      lastName: this.lastName,
      userId: this._id,
    }
    return JWT.sign(user, process.env.JWT_SECRET_KEY)
  },
  matchPassword(password) {
    return bcrypt.compare(password, this.password)
  },
})
UserSchema.statics = {
  async checkUser(payload) {
    try {
      let user = await this.findOne({ email: payload.email.trim() })
      if (!user)
        return { status: false }
      let isPasswordMatch = matchPassword(req.body.password)
      if (!isPasswordMatch)
        return { status: false }
      delete user.password
      return { status: true, data: user }
    } catch (error) {
      throw error
    }
  },
  async getUserByEmail(payload) {
    try {
      let user = await this.findOne({ email: payload.email.trim() }, '-password')
      if (!user)
        return { status: false }
      delete user.password
      return { status: true, data: user }
    } catch (error) {
      throw error
    }
  }

}

module.exports = mongoose.model("User", UserSchema)