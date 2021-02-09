const mongoose = require('mongoose')
const { generateUId } = require('@service/Generator')

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    trim: true,
    unique: true,
  },

  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
   email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: /\S+@\S+\.\S+/
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  organisationName: {
    type: String,
    trim: true,
  },
})

EmployeeSchema.pre("save", async function save(next) {
  try {
    if (!this.isNew) return next()
    this.employeeId = await generateUId()
    return next()
  } catch (error) {
    return next(error)
  }
})

EmployeeSchema.statics = {
  async getEmployeeByUserId(payload) {
    try {
      let employee = await this.findOne({ userId: payload.userId.trim() })
      if (!employee)
        return { status: false }
      return { status: true, data: employee }
    } catch (error) {
      throw error
    }
  },
}
module.exports = mongoose.model("Employee", EmployeeSchema)