const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes.js')

const cors = require('./cors.js')

const jwtMiddleware = require('./jwtMiddleware')

server.opts( /.*/, ( req, res ) => res.send( 204 ) )

server.pre(cors.preflight)

server.use(cors.actual)

server.use(restify.plugins.bodyParser())

server.use(restify.plugins.queryParser())

server.use(jwtMiddleware())

server.pre(restify.pre.sanitizePath())

routes(server)

module.exports = server
