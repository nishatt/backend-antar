const mongoose = require('mongoose')
const { generateUId } = require('../service/general')

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    trim: true,
    unique: true,
    required: true
    // ,
    // default: function genUUID() {
    //   return uuid.v1()
    // }
  },

  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  organistationName: {
    type: String,
    trim: true,
  },
})

EmployeeSchema.pre("save", async function save(next) {
  try {
    console.log("sss", generateUId());
    if (!this.isNew()) return next()
    this.employeeId = await generateUId()
    return next()
  } catch (error) {
    return next(error)
  }
})
module.exports = mongoose.model("Employee", EmployeeSchema)