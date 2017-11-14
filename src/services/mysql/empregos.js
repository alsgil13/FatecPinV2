const empregos = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{

			const queryEmpregos = 
			`SELECT idtb_empregos AS id, titulo,texto, data_postagem, 
			link_vaga, tb_empregos.excluido AS emprego_excluido, 
			tb_admins.idtb_admins AS id_admin, tb_admins.nome AS admin_nome, 
			tb_admins.email AS email_admin, tb_empresas.idtb_empresas AS id_empresa, 
			tb_empresas.nome AS nome_empresa, tb_empresas.email AS email_empresa, cidade, estado 
			FROM tb_empregos 
			JOIN tb_admins ON tb_empregos.tb_admins_idtb_admins = tb_admins.idtb_admins 
			JOIN tb_empresas ON tb_empregos.tb_empresa_idtb_empresa = tb_empresas.idtb_empresas 
			WHERE tb_empregos.excluido = 0` 	
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
			const queryEmpregos = 
			`SELECT idtb_empregos AS id, titulo,texto, data_postagem, 
			link_vaga, tb_empregos.excluido AS emprego_excluido, 
			tb_admins.idtb_admins AS id_admin, tb_admins.nome AS admin_nome, 
			tb_admins.email AS email_admin, tb_empresas.idtb_empresas AS id_empresa, 
			tb_empresas.nome AS nome_empresa, tb_empresas.email AS email_empresa, cidade, estado 
			FROM tb_empregos 
			JOIN tb_admins ON tb_empregos.tb_admins_idtb_admins = tb_admins.idtb_admins 
			JOIN tb_empresas ON tb_empregos.tb_empresa_idtb_empresa = tb_empresas.idtb_empresas 
			WHERE tb_empregos.idtb_empregos = ?` 	

				connection.query(queryEmpregos,[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					var result = results[0]
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
					resolve({emprego: resultado})
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
