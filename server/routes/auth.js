const express = require('express')
const Debug = require('debug')
const jwt = require('jsonwebtoken')
const { config } = require('../config')
const User = require('../store/user')
const bcrypt = require('bcryptjs')
const { handleLoginFailed } = require('../middleware/errors')
const app = express.Router()
const debug = new Debug('platzi-overflow:auth*')

const createToken = (user) => jwt.sign({ user }, config.secret, { expiresIn: 86400 })

app.post('/signin', async (req, res, next) => {
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
})

app.post('/signup', async (req, res) => {
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
