
const sha1 = require('sha1')

const admins = deps => {
	return {
		/**
		 * [Todos os Administradores]
		 * @return {[json]} [detalhes de todos os admins cadastrados no banco, exceto senha]
		 */
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select idtb_admins as id, nome, email, excluido from tb_admins WHERE excluido = 0',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar os admins', reject)
						return false
					}
					resolve({admins: results})
				})
			})			
		},
		/**
		 * [Adminstrador específico]
		 * @param  {[json]} id [Id do administrador]
		 * @return {[json]}    [detalhes do administrador]
		 */
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select idtb_admins as id, nome, email, excluido from tb_admins Where idtb_admins = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'Erro ao buscar Admnistrador', reject)
						return false
					}
					resolve({admins: results[0]})
				})
			})			
		},
		/**
		 * [Incluir Adminstrador]
		 * @param  {[json]} nome     [nome do Administrador]
		 * @param  {[json]} senha    [senha do administrador]
		 * @param  {[json]} email    [email do administrador]
		 * @return {[json]}          [Administradir Criado]
		 */
		save: (nome,senha,email) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_admins (nome,senha,email,excluido) Values(?,?,?,0)',[nome,sha1(senha),email],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({admins: {nome, email, id: results.insertId}})
				})
				
			})	
		},
		/**
		 * [Atualizar administrador]
		 * @param  {[json]} idtb_admins [id do administrador]
		 * @param  {[json]} nome     [nome do administrador]
		 * @param  {[json]} senha    [senha do administrador]
		 * @param  {[json]} email    [email do administrador]
		 * @return {[json]}          [Administradir atualizado]
		 */
		update: (idtb_admins,nome,senha,email) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_admins set nome = ?, senha = ?, email = ?, excluido = 0 Where idtb_admins = ?',[nome,sha1(senha),email,idtb_admins],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({admins: {idtb_admins,nome,email}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 		/**
 		 * [Softdel do Ad inistrador]
 		 * @param  {[json]} idtb_admins [id do administrador]
 		 * @return {[json]}             [mensagem de sucesso/erro]
 		 */
	  	del: (idtb_admins) => {
				return new Promise((resolve, reject)=>{
				const { connection, errorHandler } = deps				
					connection.query('UPDATE tb_admins SET excluido = 1 Where idtb_admins = ?',[idtb_admins],(error,results)=>{
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



module.exports = admins