const express = require('express')
const required = require('../middleware/auth')
const questionMiddleware = require('../middleware/question')
const Question = require('../store/question')
const { handleError } = require('../utils')
const User = require('../models/user')
const app = express.Router()

// GET /api/questions/:id
app.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const question = await Question.findById(_id)
        res.status(200).json(question)
    } catch (error) {
        console.error(error)
        handleError(error, res)
    }
})

// GET /api/questions
app.get('/', async (req, res) => {
    try {
        const { sort } = req.query
        const questions = await Question.findAll(sort)
        res.status(200).json(questions)
    } catch (error) {
        console.error(error)
        handleError(error, res)
    }
})

// POST /api/questions
app.post('/', async (req, res) => {
    try {
        console.log(req.user)
        const { title, description, icon, user } = req.body
        const q = {
            title,
            description,
            icon,
            user : "5f13cf15e3a6861cd09a856d"
        }

        const savedQuestion = await Question.create(q)
        res.status(201).json(savedQuestion)
    } catch (error) {
        handleError(error, res)
    }
})

app.post('/:id/answers', async (req, res) => {
    const idQuestion = req.params.id
    const answer = req.body
    answer.createdAt = new Date()
    try {
        const savedAnswer = await Question.createAnswer(idQuestion, answer)
        const question = await Question.findById(idQuestion)
        res.status(201).json(question)
    } catch (error) {
        handleError(error, res)
    }
})

module.exports = app