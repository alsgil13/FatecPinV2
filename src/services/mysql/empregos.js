

const empregos = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{

			const queryEmpregos = 
			'Select idtb_empregos as id, titulo,texto, data_postagem, link_vaga, tb_empregos.excluido as emprego_excluido, ' +
			' tb_admins.idtb_admins as id_admin, tb_admins.nome as admin_nome, tb_admins.email as email_admin,' +
			' tb_empresas.idtb_empresas as id_empresa, tb_empresas.nome as nome_empresa, tb_empresas.email as email_empresa, cidade, estado ' +
			 'from tb_empregos '+
			 'JOIN tb_admins ON tb_empregos.tb_admins_idtb_admins = tb_admins.idtb_admins '+
			 'JOIN tb_empresas ON tb_empregos.tb_empresa_idtb_empresa = tb_empresas.idtb_empresas' 	
			console.log(queryEmpregos)
			const { connection, errorHandler } = deps
				connection.query(queryEmpregos,(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as empregos', reject)
						return false
					}
					var final = []
					for(index in results){
						var result = results[index]
						resultado ={						
						
							'id' : result.id,
							'titulo' : result.titulo,
							'texto' : result.texto,
							'data_postagem': result.data_postagem,
							'link_vaga': result.link_vaga,
							'local_evento': result.local_evento,
							'link_evento': result.link_evento,
							'excluido': result.emprego_excluido,
							'admins' : {
								'id' : result.id_admin,
								'nome' : result.admin_nome,
								'email': result.email_admin
							},
							'empresa':{
								'id' : result.id_empresa,
								'nome':result.nome_empresa,
								'email':result.email_empresa,
								'cidade':result.cidade,
								'estado':result.estado

							}


						}
						final.push(resultado)						
					}


					resolve({empregos: final})
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
				connection.query('Insert Into tb_empregos (tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga) Values (?,?,?,?,?,?,?)',[tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga],(error,results)=>{
					if(error){
						console.log(error)
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
				connection.query('Update tb_empregos set tb_empresa_idtb_empresa = ?, tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = ?, excluido = ?, link_vaga = ? Where idtb_empregos = ?', [tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo, texto, data_postagem, excluido, link_vaga, idtb_empregos],(error,results)=>{
					
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
