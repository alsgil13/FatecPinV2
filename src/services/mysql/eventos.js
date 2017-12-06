const eventos = deps => {
	return {
		/**
		 * [Todos os Eventos]
		 * @return {[json]} [detalhes de todos os eventos cadastrados no banco]
		 */
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				const queryEventos = 'Select ev.idtb_eventos as id, ev.titulo, ev.texto, ev.data_postagem, '+
				'ev.data_evento, ev.local_evento, ev.link_evento,ev.excluido, ad.* from tb_eventos as ev '+
				'JOIN tb_admins as ad ON ev.tb_admins_idtb_admins = ad.idtb_admins ' + 
				'WHERE ev.excluido = 0'
				
				connection.query(queryEventos,(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as eventos', reject)
						return false
					}
					//console.log(results)
					var final = []
					for(index in results){
						var result = results[index]
						resultado ={						
						
							'id' : result.id,
							'titulo' : result.titulo,
							'texto' : result.texto,
							'data_postagem': result.data_postagem,
							'data_evento': result.data_evento,
							'local_evento': result.local_evento,
							'link_evento': result.link_evento,
							'excluido': result.excluido,
							'admins' : {
								'id' : result.idtb_admins,
								'nome' : result.nome,
								'email': result.email
							}

						}
						final.push(resultado)						
					}
				

					resolve({eventos: final})
				})
			})			
		},
		/**
		 * [Evento especifico]
		 * @param  {[json]} id [id do evento]
		 * @return {[json]}    [detalhes do evento]
		 */
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query(`Select ev.idtb_eventos as id, ev.titulo, ev.texto, ev.data_postagem, 
								ev.data_evento, ev.local_evento, ev.link_evento, ev.excluido, ad.* 
								from tb_eventos as ev 
								JOIN tb_admins as ad 
								ON ev.tb_admins_idtb_admins = ad.idtb_admins
								Where ev.idtb_eventos = ?
				`,[id],(error,results)=>{
					if(error){
						errorHandler(error,'Erro ao buscar Evento', reject)
						return false
					}
						var result = results[0]
						resultado ={						
						
							'id' : result.id,
							'titulo' : result.titulo,
							'texto' : result.texto,
							'data_postagem': result.data_postagem,
							'data_evento': result.data_evento,
							'local_evento': result.local_evento,
							'link_evento': result.link_evento,
							'excluido': result.excluido,
							'admins' : {
								'id' : result.idtb_admins,
								'nome' : result.nome,
								'email': result.email
							}

						}

					resolve({eventos: resultado})
				})
			})			
		},
		/**
		 * [Insere evento]
		 * @param  {[json]} tb_admins_idtb_admins [id do admin que esta incluindo]
		 * @param  {[json]} titulo                [titulo do evento]
		 * @param  {[json]} texto                 [texto do evento]
		 * @param  {[json]} data_evento           [data do evento]
		 * @param  {[json]} local_evento          [local do envento]
		 * @return {[json]}                       [evento criado]
		 */
		save: (tb_admins_idtb_admins,titulo,texto,data_evento,local_evento) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_eventos (tb_admins_idtb_admins,titulo,texto,data_postagem,data_evento,local_evento,excluido) Values(?,?,?,NOW(),?,?,0)',[tb_admins_idtb_admins, titulo,texto, data_evento,local_evento],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({eventos: {tb_admins_idtb_admins, titulo,texto, data_evento,local_evento,id: results.insertId}})
				})
				
			})	
		},
		/**
		 * [Altera evento]
		 * @param  {[json]} idtb_eventos          [id do evento]
		 * @param  {[json]} tb_admins_idtb_admins [id do admin que está alterando]
		 * @param  {[json]} titulo                [titulo do evento]
		 * @param  {[json]} texto                 [texto do evento]
		 * @param  {[json]} data_evento           [data do evento]
		 * @param  {[json]} local_evento          [local do evento]
		 * @return {[json]}                       [evento atualizado]
		 */
		update: (idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_evento,local_evento) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_eventos set tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = NOW(), data_evento = ?, local_evento = ?, excluido = 0 Where idtb_eventos = ?', [tb_admins_idtb_admins, titulo, texto, data_evento, local_evento, idtb_eventos],(error,results)=>{
					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({eventos: {idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_evento,local_evento}, affectedRows: results.affectedRows})
				})
				
			})	
		},
		/**
		 * [SoftDel do evento]
		 * @param  {[json]} idtb_eventos [id do evento]
		 * @return {[json]}              [mensagem de sucesso/erro]
		 */
	  	del: (idtb_eventos) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				//connection.query('Delete From tb_eventos Where idtb_eventos = ?',[idtb_eventos],(error,results)=>{
				connection.query('UPDATE tb_eventos SET excluido = 1 Where idtb_eventos = ?',[idtb_eventos],(error,results)=>{
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