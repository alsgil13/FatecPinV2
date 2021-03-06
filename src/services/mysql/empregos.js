const empregos = deps => {
	return {
		/**
		 * [Todos os empregos]
		 * @return {[json]}        [detalhes de todos os empregos]
		 */
		all: (filter) => {
			return new Promise((resolve, reject)=>{		

				const search = (filter.search && filter.search.length >= 3) ? "%" + filter.search + "%" : "%%";
				const start = filter.start ? parseInt(filter.start) : 0;
				const limit = filter.limit ? parseInt(filter.limit) : 15; // default value if not setted
				const { connection, errorHandler, paginate } = deps		
				connection.query(`					
					SELECT SQL_CALC_FOUND_ROWS emp.*,
					adm.nome as admin_nome,
					adm.email as admin_email,
					comp.*
					FROM tb_empregos emp
					JOIN tb_admins adm ON emp.tb_admins_idtb_admins = adm.idtb_admins
					JOIN tb_empresas comp ON emp.tb_empresa_idtb_empresa = comp.idtb_empresas
					WHERE emp.excluido = 0 && (emp.titulo LIKE ? || emp.texto LIKE ? || comp.nome LIKE ? || comp.cidade LIKE ?)		
					LIMIT ?,?; SELECT FOUND_ROWS() as total
					`,[search, search, search, search, start,limit],(error,output) => {
					const results = output[0]
					if(error && !results.length){
						errorHandler(error,'Falha ao listar as empregos', reject)
						return false
					}
					var final = []
					for(index in results){
						var result = results[index]
						resultado = {		
							'id' : result.idtb_empregos,
							'titulo' : result.titulo,
							'texto' : result.texto,
							'data_postagem': result.data_postagem,
							'link_vaga': result.link_vaga,
							'excluido': result.emprego_excluido,
							'admins' : {
								'id' : result.tb_admins_idtb_admins,
								'nome' : result.admin_nome,
								'email': result.admin_email
							},
							'empresa':{
								'id' : result.idtb_empresas,
								'nome':result.nome,
								'email':result.email,
								'cidade':result.cidade,
								'estado':result.estado
							}
						}
						final.push(resultado)						
					}		
					if(!results.length > 0) {
						resolve({empregos: final})
						return false;
					}	
					resolve(paginate('/public/empregos', output[1][0].total, start, limit, {
						empregos: final
					}))
				})
			})			
		},
		/**
		 * [Emprego específico]
		 * @param  {[json]} id [id do emprego]
		 * @return {[json]}    [detalhes do eprego]
		 */
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
						errorHandler(error,'Erro ao buscar emprego', reject)
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
		/**
		 * [Insere emprego]
		 * @param  {[json]} tb_empresa_idtb_empresa [id da empresa que oferece a vaga]
		 * @param  {[json]} tb_admins_idtb_admins   [id do admin que está cadastrando]
		 * @param  {[json]} titulo                  [titulo da vaga]
		 * @param  {[json]} texto                   [descrição da vaga]
		 * @param  {[json]} link_vaga               [link da vaga]
		 * @return {[json]}                         [vaga criada]
		 */
		save: (tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, link_vaga) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				// var now = new Date()
				// var agora = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' ' + now.getHours()+ ':' + now.getMinutes()+ ':' + now.getSeconds()
				// console.log(agora)
				connection.query('Insert Into tb_empregos (tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo,texto,data_postagem,excluido,link_vaga) Values (?,?,?,?,NOW(),0,?)',[tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, link_vaga],(error,results)=>{
					if(error){
						console.log(error)
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({empregos: {tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo, texto, link_vaga, id: results.insertId}})
				})
				
			})	
		},
		/**
		 * [Altera Emprego]
		 * @param  {[json]} idtb_empregos           [id do emprego]
		 * @param  {[json]} tb_empresa_idtb_empresa [id da empresa]
		 * @param  {[json]} tb_admins_idtb_admins   [id do admin que está alterando]
		 * @param  {[json]} titulo                  [titulo do emprego]
		 * @param  {[json]} texto                   [Descrição do emprego]
		 * @param  {[json]} link_vaga               [link da vaga]
		 * @return {[json]}                         [vaga alterada]
		 */
		update: (idtb_empregos,tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, link_vaga) => {
			return new Promise((resolve, reject)=>{
			//console.log(idtb_eventos,tb_admins_idtb_admins, titulo,texto, data_postagem,data_evento,local_evento,link_evento, excluido)	
			const { connection, errorHandler } = deps				
				connection.query('Update tb_empregos set tb_empresa_idtb_empresa = ?, tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = NOW(), excluido = 0, link_vaga = ? Where idtb_empregos = ?', [tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo, texto,  link_vaga, idtb_empregos],(error,results)=>{
					
					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({empregos: {idtb_empregos,tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto,link_vaga}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 		/**
 		 * [Softdel de Vaga]
 		 * @param  {[json]} idtb_empregos [id do emprego]
 		 * @return {[json]}               [mensagem de sucesso/erro]
 		 */
	  	del: (idtb_empregos) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				//connection.query('Delete From tb_empregos Where idtb_empregos = ?',[idtb_empregos],(error,results)=>{
				connection.query('UPDATE tb_empregos SET excluido = 1 WHERE idtb_empregos = ?',[idtb_empregos],(error,results)=>{
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
