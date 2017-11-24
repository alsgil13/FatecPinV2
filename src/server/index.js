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
    var oneof = false;

    res.header('Access-Control-Allow-Origin', '*');

    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(req.headers['x-access-token']) {
        res.header('Access-Control-Allow-Headers', req.headers['x-access-token']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

server.use(restify.plugins.bodyParser())

server.use(restify.plugins.queryParser())

server.use(jwtMiddleware())

server.pre(restify.pre.sanitizePath())

routes(server)

module.exports = server
