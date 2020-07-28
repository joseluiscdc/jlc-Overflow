const Debug = require('debug')
const ObjectId = require('mongodb').ObjectId;
const Answer  = require('../models/answer')
const debug = new Debug('jlc-overflow:store:answer*')

async function deleteAnswers(userId) {
    debug(`Deelting answers of user ${userId}`)
    return Answer.deleteMany({"user": ObjectId(`${userId}`)})
}

module.exports = {
    deleteAnswers
}
