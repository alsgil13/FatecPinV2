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
					resolve({eventos: results})
				})
			})			
		},
		save: (tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_eventos (tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido) Values(?,?,?,?,?,?,?,?)',[tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({eventos: {tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido, id: results.insertId}})
				})
				
			})	
		},
		update: (idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido) => {
			return new Promise((resolve, reject)=>{
			//console.log(idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido)	
			const { connection, errorHandler } = deps				
				connection.query('Update tb_eventos set tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = ?, data_evento = ?, local_evento = ?, link_evento = ?, excluido = ? Where idtb_eventos = ?', [tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, link_evento, excluido, idtb_eventos],(error,results)=>{
					frase = 'Update tb_eventos set tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = ?, data_evento = ?, link_evento = ?, excluido = ? Where idtb_eventos = ?',tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, link_evento, excluido, idtb_eventos
					//console.log(frase)
					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({eventos: {idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
	  	del: (idtb_eventos) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Delete From tb_eventos Where idtb_eventos = ?',[idtb_eventos],(error,results)=>{
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



module.exports = eventos