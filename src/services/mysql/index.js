const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'talita150115',
	database: 'fatecpin'

})

const errorHandler = (error,msg,rejectFunction) =>{
	console.error(error)
	rejectFunction({error: msg})
}

const noticiasModule = require('./noticias')({ connection, errorHandler })
const empregosModule = require('./empregos')({ connection, errorHandler })
const empresasModule = require('./empresas')({ connection, errorHandler })
const eventosModule = require('./eventos')({ connection, errorHandler })
const pinsModule = require('./pins')({ connection, errorHandler })
const adminsModule = require('./admins')({ connection, errorHandler })

module.exports = {
	noticias: () => noticiasModule,
	empregos: () => empregosModule,
	eventos: () => eventosModule,
	pins: () => pinsModule,
	admins: () => adminsModule,
	empresas: () => empresasModule

}
