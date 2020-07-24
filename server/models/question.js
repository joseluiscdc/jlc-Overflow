const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const QuestionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    icon: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    user: { type: ObjectId, ref: 'User', required: true },
    answers: [{ type: ObjectId, ref: 'User', default: [] }]
})

const question = mongoose.model('Question', QuestionSchema)

module.exports = question