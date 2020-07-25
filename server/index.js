const http = require('http')
const Debug = require('debug')
const { config } = require('./config/')
const mongoose = require('mongoose')
const app = require('./app')
const debug = new Debug('jlc-overflow:server-index*')

mongoose.Promise = global.Promise
async function start(){
	await mongoose.connect(config.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
	    .then(() => {
	        debug('[Data Base] Success connected!')
			app.listen(config.port, () => {
				debug(`[Server] running at port ${config.port}`)
			})
	    })
	    .catch(error => {
	    	debug(`[Data Base] Fail connected ${error}`)
	    })
}
start()
