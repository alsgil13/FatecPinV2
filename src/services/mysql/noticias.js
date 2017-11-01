

const noticias = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_noticias',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as noticias', reject)
						return false
					}
					resolve({noticias: results})
				})
			})			
		},
		
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_noticias Where idtb_noticias = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'lalalalalalalal', reject)
						return false
					}
					console.log(results)
					resolve({noticia: results})
				})
			})			
		},

		save: (tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_noticias (tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido) Values(?,?,?,?,?,?)',[tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({noticias: {tb_admins_idtb_admins, titulo, texto, data_postagem, excluido, id: results.insertId}})
				})
				
			})	
		},
		
		update: (id_tbnoticias,tb_admins_idtb_admins, titulo, texto, data_postagem, excluido) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_noticias set tb_admins_idtb_admins = ?, titulo = ?, texto = ?, data_postagem = ?, excluido = ? Where idtb_noticias = ?',[tb_admins_idtb_admins, titulo, texto, data_postagem, excluido, id_tbnoticias],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					console.log(id_tbnoticias)
					resolve({noticias: {tb_admins_idtb_admins, titulo, texto, data_postagem, excluido, id_tbnoticias}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 
 		del: (idtb_noticias) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Delete From tb_noticias Where idtb_noticias = ?',[idtb_noticias],(error,results)=>{
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