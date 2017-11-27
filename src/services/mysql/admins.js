
const sha1 = require('sha1')

const admins = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select idtb_admins as id, nome, email, excluido from tb_admins WHERE excluido = 0',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar os admins', reject)
						return false
					}
					resolve({admins: results})
				})
			})			
		},

		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select idtb_admins as id, nome, email, excluido from tb_admins Where idtb_admins = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					resolve({admins: results[0]})
				})
			})			
		},
		save: (nome,senha,email,excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_admins (nome,senha,email,excluido) Values(?,?,?,?)',[nome,sha1(senha),email,excluido],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({admins: {nome,email,excluido, id: results.insertId}})
				})
				
			})	
		},
		update: (idtb_admins,nome,senha,email,excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_admins set nome = ?, senha = ?, email = ?, excluido = 0 Where idtb_adm/ins = ?',[nome,sha1(senha),email,idtb_admins],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({admins: {idtb_admins,nome,email}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
	  	del: (idtb_admins) => {
				return new Promise((resolve, reject)=>{
				const { connection, errorHandler } = deps				
					connection.query('UPDATE tb_admins SET excluido = 1 Where idtb_admins = ?',[idtb_admins],(error,results)=>{
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



module.exports = admins