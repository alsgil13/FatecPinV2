const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes.js')

const cors = require('./cors.js')

const jwtMiddleware = require('./jwtMiddleware')

server.pre(cors.preflight) //cors

server.use(cors.actual)

server.use(restify.plugins.bodyParser({
    mapParams: true
}))

server.use(restify.plugins.queryParser({
    mapParams: true
}))

server.use(jwtMiddleware())

server.pre(restify.pre.sanitizePath())

routes(server)

module.exports = server
