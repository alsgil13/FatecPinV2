
const pins = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query(`
					SELECT p.*, ad.*
					FROM tb_pins as p
					JOIN tb_admins as ad
					ON p.tb_admins_idtb_admins = ad.idtb_admins
				`, (error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar os pins', reject)
						return false
					}
					var final = []
					for(index in results){
						var result = results[index]
						resultado = {		
							'id' : result.idtb_pins,
							'descricao' : result.descricao,
							'data_postagem': result.data_postagem,
							'excluido': result.excluido,
							'admins' : {
								'id' : result.idtb_admins,
								'nome' : result.nome,
								'email': result.email
							}

						}
						final.push(resultado)						
					}
					resolve({pins: final})
					
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