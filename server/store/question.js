const Debug = require('debug')
const ObjectId = require('mongodb').ObjectId;
const Question = require('../models/question')
const Answer  = require('../models/answer')
const debug = new Debug('jlc-overflow:store:question*')

async function findAll(sort = '-createdAt', userId = '') {
    debug('Get all questions...')
    if(userId !== ''){
      return Question.find({"user": ObjectId(`${userId}`)}).populate('answers').sort(sort)
    }
    return Question.find().populate('answers').sort(sort)
}

async function findById(_id) {
    debug(`Get question by id ${_id}`)
    return Question
        .findOne({ _id })
        .populate('user')
        .populate({
            path: 'answers',
            options: { sort: '-createdAt' },
            populate: {
                path: 'user',
                model: 'User'
            }
        })
}

async function create(q) {
    debug(`Creating a new question...`)
    const question = new Question(q)
    return question.save()
}

async function createAnswer(q, a) {
    debug(`Creating a new answer para question: ${q._id}`)
    const answer = new Answer(a)
    const savedAnswer = await answer.save()
    q.answers.push(savedAnswer)
    await q.save()
    return savedAnswer
}

module.exports = {
    findAll,
    findById,
    create,
    createAnswer,
}
