const express = require('express')
const required = require('../middleware/auth')
const questionMiddleware = require('../middleware/question')
const Question = require('../store/question')
const { handleError } = require('../middleware/errors')
const User = require('../models/user')
const app = express.Router()

app.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const question = await Question.findById(_id)
        res.status(200).json(question)
    } catch (error) {
        handleError(error, res)
    }
})

app.get('/', async (req, res) => {
    try {
        const { sort, userId } = req.query
        console.log(sort, userId)
        const questions = await Question.findAll(sort, userId)
        res.status(200).json(questions)
    } catch (error) {
        handleError(error, res)
    }
})

app.post('/', required, async (req, res) => {
    try {
        const { title, description, icon, user } = req.body
        const q = {
            title,
            description,
            icon,
            user: req.user._id
        }

        const savedQuestion = await Question.create(q)
        res.status(201).json(savedQuestion)
    } catch (error) {
        handleError(error, res)
    }
})

app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = new User(req.user)
    try {
        const savedAnswer = await Question.createAnswer(q, answer)
        res.status(201).json(savedAnswer)
    } catch (error) {
        handleError(error, res)
    }
})


module.exports = app