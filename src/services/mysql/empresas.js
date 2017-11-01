const empresas = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_empresas',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as empresas', reject)
						return false
					}
					console.log(results)
					resolve({empresas: results})
				})
			})			
		},

		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_empresas Where idtb_empresas = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					console.log(results)
					resolve({empresas: results})
				})
			})			
		}
	}
}



module.exports = empresas
