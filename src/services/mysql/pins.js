
const pins = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select p.id from tb_pins as p JOIN tb_admins as ad ON p.id = ad.id',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar os pins', reject)
						return false
					}
					console.log(results);
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
					resolve({pins: results})
				})
			})			
		},
		save: (tb_admins_idtb_admins, descricao, data_postagem, excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_pins (tb_admins_idtb_admins, descricao, data_postagem, excluido) Values(?,?,?,?)',[tb_admins_idtb_admins, descricao, data_postagem, excluido],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({pins: {tb_admins_idtb_admins, descricao, data_postagem, excluido, id: results.insertId}})
				})
				
			})	
		},
		update: (id_tbpins,tb_admins_idtb_admins, descricao, data_postagem, excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_pins set tb_admins_idtb_admins = ?, descricao = ?, data_postagem = ?, excluido = ? Where idtb_pins = ?',[tb_admins_idtb_admins, descricao, data_postagem, excluido, id_tbpins],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({pins: {tb_admins_idtb_admins, descricao, data_postagem, excluido, id_tbpins}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
  	del: (idtb_pins) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Delete From tb_pins Where idtb_pins = ?',[idtb_pins],(error,results)=>{
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







module.exports = pins