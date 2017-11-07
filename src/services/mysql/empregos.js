

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
					// console.log(results)
					resolve({emprego: results})
				})
			})			
		},
		save: (tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_empregos (tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga) Values(?,?,?,?,?,?,?)',[tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({empregos: {tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo, texto, data_postagem,excluido,link_vaga, id: results.insertId}})
				})
				
			})	
		},
		update: (idtb_empregos,tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga) => {
			return new Promise((resolve, reject)=>{
			//console.log(idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido)	
			const { connection, errorHandler } = deps				
				connection.query('Update tb_empregos set tb_empresa_idtb_empresa = ?, tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = ?, excluido = ?, link_vaga = ? Where idtb_empregos = ?', [tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga,idtb_empregos],(error,results)=>{
					//console.log(frase)
					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({empregos: {idtb_empregos,tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
	  	del: (idtb_empregos) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Delete From tb_empregos Where idtb_empregos = ?',[idtb_empregos],(error,results)=>{
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



module.exports = empregos
