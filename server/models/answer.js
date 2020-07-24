const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const AnswerSchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    user: { type: ObjectId, ref: 'User', required: true }
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer