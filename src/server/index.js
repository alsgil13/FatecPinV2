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
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    // Pass to next layer of middleware
    next();

});



server.use(restify.plugins.bodyParser())

server.use(restify.plugins.queryParser())

server.use(jwtMiddleware())

server.pre(restify.pre.sanitizePath())

routes(server)

module.exports = server
