
const pins = deps => {
	return {
		all: (filter) => {			
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps	
				const start = filter.start ? parseInt(filter.start) : 0;
				const limit = filter.limit ? parseInt(filter.limit) : 5; // default value if not setted
				connection.query(`
					SELECT p.*, ad.*, (SELECT COUNT(1) FROM tb_pins) as total
					FROM tb_pins as p
					JOIN tb_admins as ad
					ON p.tb_admins_idtb_admins = ad.idtb_admins
					WHERE p.excluido = 0
					ORDER BY idtb_pins DESC
					LIMIT ?,?
				`, [start,limit], (error,results)=>{
					if(error && !results.length){
						errorHandler(error,'Falha ao listar os pins', reject)
						return false
					}
					const final = []
					for(index in results) {
						const result = results[index]
						resultado = {		
							'id' : result.idtb_pins,
							'descricao' : result.descricao,
							'data_postagem': result.data_postagem,
							'excluido': result.excluido,
							'admin' : {
								'id' : result.idtb_admins,
								'nome' : result.nome,
								'email': result.email
							}
						}											
						final.push(resultado)						
					}
					if(!results.length > 0) {
						resolve({pins: final})
						return false;
					}

					const total = results[0].total
					const totalPages = Math.ceil(total / limit)
					const currentPage = Math.floor(start / limit) + 1

					resolve ({					
						totalResults: total,
						totalPages: totalPages,
						currentPage: currentPage,
						nextPage: (limit * currentPage) >= total ? null : process.env.BASE_URL + '/public/pins?limit=' + limit + '&start=' + limit * currentPage,
						previousPage: (start - limit) < 0 ? null : process.env.BASE_URL + '/public/pins?limit=' + limit + '&start=' + (start - limit),						
						pins: final
					})
					
				})
			})			
		},
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query(`SELECT p.*, ad.* 
								  FROM tb_pins as p
								  JOIN tb_admins as ad
								  ON p.tb_admins_idtb_admins = ad.idtb_admins
					 			  Where idtb_pins = ?`,
					 [id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					resultado = {		
						'id' : results[0].idtb_pins,
						'descricao' : results[0].descricao,
						'data_postagem': results[0].data_postagem,
						'excluido': results[0].excluido,
						'admins' : {
							'id' : results[0].idtb_admins,
							'nome' : results[0].nome,
							'email': results[0].email
						}
					}

					resolve({pins: resultado})
				})
			})			
		},
		save: (tb_admins_idtb_admins, descricao) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_pins (tb_admins_idtb_admins, descricao, data_postagem, excluido) Values(?,?,NOW(),0)',[tb_admins_idtb_admins, descricao],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					//console.log(results)
					resolve({pins: results})
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