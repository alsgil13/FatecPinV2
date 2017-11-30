
const pins = deps => {
	return {
		all: (filter) => {			
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler, paginate } = deps	
				const search = (filter.search && filter.search.length >= 3) ? "%" + filter.search + "%" : "%%";
				const start = filter.start ? parseInt(filter.start) : 0;
				const limit = filter.limit ? parseInt(filter.limit) : 15; // default value if not setted
				connection.query(`
					SELECT SQL_CALC_FOUND_ROWS p.*, ad.*
					FROM tb_pins as p
					JOIN tb_admins as ad
					ON p.tb_admins_idtb_admins = ad.idtb_admins
					WHERE p.excluido = 0 AND p.descricao LIKE ?			
					ORDER BY idtb_pins DESC
					LIMIT ?,?; SELECT FOUND_ROWS() as total
				`, [search,start,limit], (error,output)=>{	
					const results = output[0]											
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
					resolve(paginate('/public/pins', output[1][0].total, start, limit, {
						pins: final
					}))
					
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
					resolve({pins: {tb_admins_idtb_admins, descricao, id: results.insertId}})
				})
				
			})	
		},
		update: (id_tbpins,tb_admins_idtb_admins, descricao) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_pins set tb_admins_idtb_admins = ?, descricao = ?, data_postagem = NOW(), excluido = 0 Where idtb_pins = ?',[tb_admins_idtb_admins, descricao, id_tbpins],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({pins: {tb_admins_idtb_admins, descricao, id_tbpins}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
  	del: (idtb_pins) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				//connection.query('Delete From tb_pins Where idtb_pins = ?',[idtb_pins],(error,results)=>{
				connection.query('UPDATE tb_pins SET excluido = 1 Where idtb_pins = ?',[idtb_pins],(error,results)=>{
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