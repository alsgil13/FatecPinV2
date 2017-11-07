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
					resolve({empresas: results})
				})
			})			
		},
		save: (nome, telefone, email, cidade, estado) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_empresas (nome, telefone, email, cidade, estado) Values(?,?,?,?,?)',[nome, telefone, email, cidade, estado],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({empresas: {nome, telefone, email, cidade, estado, id: results.insertId}})
				})
				
			})	
		},
		update: (idtb_empresas,nome, telefone, email, cidade, estado) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_empresas set nome = ?, telefone = ?, email = ?, cidade = ?, estado = ? Where idtb_empresas = ?',[nome, telefone, email, cidade, estado, idtb_empresas],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({empresas: {idtb_empresas,nome, telefone, email, cidade, estado}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
	  	del: (idtb_empresas) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Delete From tb_empresas Where idtb_empresas = ?',[idtb_empresas],(error,results)=>{
					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao remover', reject)
						return false
					}
					resolve({message: 'Removido com sucesso', affectedRows: results.affectedRows})
				})
				
			})	
	
		}
	}
}



module.exports = empresas
