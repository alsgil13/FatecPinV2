const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
	host: process.env.MYSQL_HOST,
	user:process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	multipleStatements: true

})

const errorHandler = (error,msg,rejectFunction) =>{
	console.error(error)
	rejectFunction({error: msg})
}

const paginate = function(endpoint, total, start, limit, obj) {		
		const totalPages = Math.ceil(total / limit)
		const currentPage = Math.floor(start / limit) + 1
		const result = {					
			totalResults: total,
			totalPages: totalPages,
			currentPage: currentPage,
			nextPage: (limit * currentPage) >= total ? null : process.env.BASE_URL + endpoint + '?limit=' + limit + '&start=' + limit * currentPage,
			previousPage: (start - limit) < 0 ? null : process.env.BASE_URL + endpoint + '?limit=' + limit + '&start=' + (start - limit)			
		}
		return Object.assign(result, obj)
}

const noticiasModule = require('./noticias')({ connection, errorHandler, paginate })
const empregosModule = require('./empregos')({ connection, errorHandler, paginate })
const empresasModule = require('./empresas')({ connection, errorHandler, paginate })
const eventosModule = require('./eventos')({ connection, errorHandler, paginate })
const pinsModule = require('./pins')({ connection, errorHandler, paginate })
const adminsModule = require('./admins')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })
const dispositivosModule = require('./dispositivos')({ connection, errorHandler })


module.exports = {
	noticias: () => noticiasModule,
	empregos: () => empregosModule,
	eventos: () => eventosModule,
	pins: () => pinsModule,
	admins: () => adminsModule,
	empresas: () => empresasModule,
	dispositivos: () => dispositivosModule,
	auth: () => authModule

}
