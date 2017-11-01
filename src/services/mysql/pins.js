const pins = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_pins',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar os pins', reject)
						return false
					}
					console.log(results)
					resolve({pins: results})
				})
			})			
		},
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_pins Where idtb_pins = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					console.log(results)
					resolve({pins: results})
				})
			})			
		}

	}
}



module.exports = pins