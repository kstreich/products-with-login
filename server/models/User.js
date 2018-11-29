let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const SALT = 15
let name = "User"

let schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  wishList: { type: ObjectId, ref: "Wishlist" }
})

//hashes a password (used when password is created/ changed)
//Statics are function on the class
schema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, SALT)
}
//Methods are functions on the Instance on the class
//takes in a string and compares it to the Hash on the user object
schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

let model = mongoose.model(name, schema)

module.exports = model