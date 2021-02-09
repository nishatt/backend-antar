const mongoose = require("mongoose")

const uri = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`

// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
console.log();
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
}).then(() => {
  console.log("successfully connected to database");
}).catch(error => {
  console.log("could not connect to database", error)
  process.exit()
})