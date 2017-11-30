

const noticias = deps => {
	return {
		all: (filter) => {
			return new Promise((resolve, reject)=>{
			const search = (filter.search && filter.search.length >= 3) ? "%" + filter.search + "%" : "%%";
			const start = filter.start ? parseInt(filter.start) : 0;
			const limit = filter.limit ? parseInt(filter.limit) : 15; // default value if not setted
			const { connection, errorHandler, paginate } = deps		
					
				connection.query(`
					SELECT SQL_CALC_FOUND_ROWS n.*, ad.*
					FROM tb_noticias as n
					JOIN tb_admins as ad
					ON n.tb_admins_idtb_admins = ad.idtb_admins
					WHERE n.excluido = 0 &&
						(n.titulo LIKE ? || n.texto LIKE ?)
					ORDER BY idtb_noticias DESC
					LIMIT ?,?; SELECT FOUND_ROWS() as total
					`, [search,search,start,limit], (error,output)=>{		
					const results = output[0]
					if(error && !results.length){
						errorHandler(error,'Falha ao listar as noticias', reject)
						return false
					}	
					var final = []
					for(index in results){
						var result = results[index]
						resultado = {		
							'id' : result.id,
							'titulo' : result.titulo,
							'texto' : result.texto,
							'data_postagem': result.data_postagem,
							'imagem': result.imagem,
							'excluido': result.excluido,
							'admins' : {
								'id' : result.idtb_admins,
								'nome' : result.nome,
								'email': result.email
							}

						}
						final.push(resultado)						
					}
					if(!results.length > 0) {
						resolve({noticias: final})
						return false;
					}	
					resolve(paginate('/public/noticias', output[1][0].total, start, limit, {
						noticias: final
					}))
				})
			})			
		},
		
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select n.idtb_noticias as id, n.titulo, n.texto, '+
					'n.data_postagem, n.imagem, n.excluido, ad.* from tb_noticias as n '+
					'JOIN tb_admins as ad ON n.tb_admins_idtb_admins = ad.idtb_admins ' +
					'Where idtb_noticias = ? && excluido = 0',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
						var result=results[0]
						resultado ={						
							'id' : result.id,
							'titulo' : result.titulo,
							'texto' : result.texto,
							'data_postagem': result.data_postagem,
							'imagem': result.imagem,
							'excluido': result.excluido,
							'admins' : {
								'id' : result.idtb_admins,
								'nome' : result.nome,
								'email': result.email
							}
						}

					resolve({noticia: resultado})
				})
			})			
		},

		save: (id_admins, titulo, texto, imagem) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_noticias (tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido) Values(?,?,?,NOW(),?,0)',[id_admins, titulo, texto, imagem],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({noticias: {id_admins, titulo, texto, id: results.insertId}})
				})
			})	
		},
		
		update: (idtb_noticias,tb_admins_idtb_admins, titulo, texto, imagem) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_noticias set tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = NOW(), imagem = ?, excluido = 0 Where idtb_noticias = ?',[tb_admins_idtb_admins, titulo, texto, imagem, idtb_noticias],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({noticias: {tb_admins_idtb_admins, titulo, texto, idtb_noticias}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
 		del: (idtb_noticias) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				//connection.query('Delete From tb_noticias Where idtb_noticias = ?',[idtb_noticias],(error,results)=>{
				connection.query('UPDATE tb_noticias SET excluido = 1 WHERE idtb_noticias = ?',[idtb_noticias],(error,results)=>{
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



module.exports = noticias