const restify = require('restify')



const server = restify.createServer();

const routes = require('../http/routes.js')

const cors = require('./cors.js')

const jwtMiddleware = require('./jwtMiddleware')

const exclusions = ['/public/autenticacao','/public/noticias', '/public/noticias/:id', '/public/empregos', '/public/empregos/:id', '/public/eventos', '/public/eventos/:id', '/public/pins', '/public/pins/:id']

server.pre(cors.preflight)

server.use(cors.actual)

server.use(restify.plugins.bodyParser())

server.use(jwtMiddleware({ exclusions }))

routes(server)

module.exports = server
