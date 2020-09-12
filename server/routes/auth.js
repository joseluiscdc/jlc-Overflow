const express = require('express')
const Debug = require('debug')
const jwt = require('jsonwebtoken')
const { config } = require('../config')
const User = require('../store/user')
const Question = require('../store/question')
const Answer = require('../store/answer')
const bcrypt = require('bcryptjs')
const { handleLoginFailed } = require('../middleware/errors')
const app = express.Router()
const debug = new Debug('platzi-overflow:auth*')
let  myResponse = { message: 'Existe un problema en el servidor!' }

const createToken = (user) => jwt.sign({ user }, config.secret, { expiresIn: 86400 })

app.post('/signin', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne(email)
        let myMessageToken = {}

        if (!user) {
            debug(`User with email ${email} not found!`)
            return handleLoginFailed(res)
        }

        if (!bcrypt.compareSync(password, user.password)) {
            debug('Do not match!')
            return handleLoginFailed(res, 'Invalid information!')
        }

        const upd = await User.updateLogin(user._id)
        const token = createToken(user)

        myResponse = {
            message: 'Login succeded!',
            token,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            lastLogin: user.lastLogin
        }
        res.status(200).json(myResponse)
    } catch (error) {
        debug('Error in app.post/signin')
        res.status(500).json(myResponse)
    }
})

app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const u = {
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 6)
        }
        debug(`Creating new user ${u}`)

        const user = await User.create(u)
        const token = createToken(user)
        myResponse = {
            message: 'User saved!',
            token,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        res.status(201).json(myResponse)
    } catch (error) {
        debug('Error in app.post/signup')
        res.status(500).json(myResponse)
    }
})

app.post('/validate', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne(email)
        let valid = true;

        if (!user) {
            debug(`User with email ${email} not found!`)
            valid = false;
        }

        if (!bcrypt.compareSync(password, user.password)) {
            debug('Do not match!')
            valid = false;
        }

        myResponse = {
            message: valid
        }
        res.status(200).json(myResponse)
    } catch (error) {
        debug('Error in app.post/signin')
        res.status(500).json(myResponse)
    }
})

app.post('/close', async (req, res, next) => {
    try{
        const { userId, email, password } = req.body
        const resA = await Answer.deleteAnswers(userId)
        const resQ = await Question.deleteQuestions(userId)
        const resU = await User.deleteUser(userId)

        myResponse = {
            message: 'Cuenta eliminada exitosamente!',
        }
        res.status(200).json(myResponse)
    } catch (error) {
        debug('Error in app.post/close')
        res.status(500).json(myResponse)
    }

})

app.get('/', async (req, res) => {
    const users = await User.findAll()
    res.status(200).json(users)
})

app.patch('/', async (req, res) => {
    const { userId, password } = req.body
    const user = await User.updatePwd(userId, bcrypt.hashSync(password, 6))
    res.status(200).json(user)
})

module.exports = app
