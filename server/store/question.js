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
    return Question.findOne({ _id })
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
    const question = new Question(q)
    if(q._id){
        debug(`Updating question ${q._id}`)
        return question.updateOne(q)
    } else {
        debug(`Creating a new question...`)
        return question.save()
    }
}

async function createAnswer(q, a) {
    debug(`Creating a new answer para question: ${q._id}`)
    const answer = new Answer(a)
    const savedAnswer = await answer.save()
    q.answers.push(savedAnswer)
    await q.save()
    return savedAnswer
}

async function deleteQuestions(userId) {
    debug(`Deleting question for user ${userId}`)
    if(userId !== ''){
      return Question.deleteMany({"user": ObjectId(`${userId}`)})
    }
}

module.exports = {
    findAll,
    findById,
    create,
    createAnswer,
    deleteQuestions,
}
