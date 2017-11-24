const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes.js')

const cors = require('./cors.js')

const jwtMiddleware = require('./jwtMiddleware')

//server.opts( /.*/, ( req, res ) => res.send( 204 ) )
/*
server.use(function(req, res, next) {
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
	next();
});

server.pre(cors.preflight)

server.use(cors.actual)
*/

server.use(function(req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	
	// intercept OPTIONS method
    if (req.method == 'OPTIONS') {
        res.send(200);
    }

    // Pass to next layer of middleware
    next();

});

server.use(restify.plugins.bodyParser())

server.use(restify.plugins.queryParser())

server.use(jwtMiddleware())

server.pre(restify.pre.sanitizePath())

routes(server)

module.exports = server
