const Question = require('../store/question')
const { handleError } = require('./errors')

async function questionMiddleware (req, res, next) {
    try {
        req.question = await Question.findById(req.params.id)
        next()
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = { questionMiddleware }
