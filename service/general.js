module.exports = {
  generateUId() {
    try {
      let keyString = "abcdefghijklmnopqrstuvwxyz0123456789"
      return [...Array(20)].map(_ => keyString[~~(Math.random() * keyString.length)]).join("")
    } catch (error) {
      return next(error)
    }
  }
}