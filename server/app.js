const express = require('express')
const bodyParser = require("body-parser");
const question = require('./routes/question')
const auth = require('./routes/auth')
const app = express()
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
	app.use(express.static(path.join(process.cwd(), 'dist/jlc-overflow')))
}

app.use('/api/questions', question)
app.use('/api/auth', auth)

module.exports = app
