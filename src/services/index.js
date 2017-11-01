const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'talita150115',
	database: 'fatecpin'

})

/*
const noticias = connection.query('Select * from tb_noticias',(error,results)=>{
	if(error){

	}

	return { noticias: results}
})
*/

module.exports = noticias
