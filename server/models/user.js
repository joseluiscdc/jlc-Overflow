const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }
})

UserSchema.plugin(uniqueValidator)

const user = mongoose.model('User', UserSchema)

module.exports = user