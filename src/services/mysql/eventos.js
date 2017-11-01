const eventos = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_eventos',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as eventos', reject)
						return false
					}
					console.log(results)
					resolve({eventos: results})
				})
			})			
		},
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_eventos Where idtb_eventos = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					console.log(results)
					resolve({eventos: results})
				})
			})			
		}		

	}
}



module.exports = eventos