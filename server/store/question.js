const Debug = require('debug')
const Question = require('../models/question')
const Answer  = require('../models/answer')
const debug = new Debug('jlc-overflow:store:question*')

async function findAll(sort = '-createdAt') {
    debug('Get all questions...')
    return Question.find().populate('user').sort(sort)
}

async function findById(_id) {
    debug(`Get question by id ${_id}`)
    return Question
        .findOne({ _id })
        .populate('user')
}

async function create(q) {
    debug(`Creating a new question...`)
    const question = new Question(q)
    return question.save()
}

async function createAnswer(q, a) {
    debug(`Add new answer to question id ${q} ... `)
    const question = await findById(q)
    question.answers.push(a)
    await question.save()
    return a
}

module.exports = {
    findAll,
    findById,
    create,
    createAnswer,
}
