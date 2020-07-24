const Debug = require('debug')
const { config } = require('../config')
const jwt = require('jsonwebtoken')

const debug = new Debug('jlc-overflow:auth-middleware*')

function required(req, res, next) {
    jwt.verify(req.query.token, config.secret, (err, token)=> {
        if (err) {
            debug('JWT wat not encrypted with our secret..')
            return res.status(401).json({
                message: 'Unauthorized!',
                error: err
            })
        }
        debug(`Token verified ${token}`)
        req.user = token.user
        next()
    })
}

module.export = { required }