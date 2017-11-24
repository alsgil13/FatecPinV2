const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  
  origins: ['*'],
  allowHeaders: ['x-access-token'],
  exposeHeaders: ['*']
})

module.exports = cors