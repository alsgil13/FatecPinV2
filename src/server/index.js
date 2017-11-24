const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes.js')

const cors = require('./cors.js')

const jwtMiddleware = require('./jwtMiddleware')

server.pre(cors.preflight)

server.use(function(req, res, next) {
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
})

server.use(cors.actual)

server.use(restify.plugins.bodyParser())

server.use(restify.plugins.queryParser())

server.use(jwtMiddleware())

server.pre(restify.pre.sanitizePath())

routes(server)

module.exports = server
