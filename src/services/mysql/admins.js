const admins = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_admins',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar os admins', reject)
						return false
					}
					console.log(results)
					resolve({admins: results})
				})
			})			
		},

		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_admins Where idtb_admins = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					console.log(results)
					resolve({admins: results})
				})
			})			
		}

	}
}



module.exports = admins