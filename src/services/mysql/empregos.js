

const empregos = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_empregos',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as empregos', reject)
						return false
					}
					console.log(results)
					resolve({empregos: results})
				})
			})			
		},
	
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_empregos Where idtb_empregos = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					console.log(results)
					resolve({emprego: results})
				})
			})			
		}

	}		

}



module.exports = empregos
