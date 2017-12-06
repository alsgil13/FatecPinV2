const empresas = deps => {
	return {
		/**
		 * [Todas as empresas]
		 * @return {[json]} [detalhes de todas as empresas]
		 */
		all: () => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_empresas',(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao listar as empresas', reject)
						return false
					}
					resolve({empresas: results})
				})
			})			
		},
		/**
		 * [empresa especifica]
		 * @param  {[json]} id [id da empresa]
		 * @return {[json]}    [detalhes de um evento]
		 */
		item: (id) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Select * from tb_empresas Where idtb_empresas = ?',[id],(error,results)=>{
					if(error){
						errorHandler(error,'Erro ao buscar empresa', reject)
						return false
					}
					resolve({empresas: results})
				})
			})			
		},
		/**
		 * [insere evento]
		 * @param  {[json]} nome     [nome da empresa]
		 * @param  {[json]} telefone [telefone da empresa]
		 * @param  {[json]} email    [email de contato]
		 * @param  {[json]} cidade   [cidade da empresa]
		 * @param  {[json]} estado   [sigal do estado com dois digitos]
		 * @return {[json]}          [empresa criada]
		 */
		save: (nome, telefone, email, cidade, estado) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Insert Into tb_empresas (nome, telefone, email, cidade, estado) Values(?,?,?,?,?)',[nome, telefone, email, cidade, estado],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({empresas: {nome, telefone, email, cidade, estado, id: results.insertId}})
				})
				
			})	
		},
		/**
		 * [atualiza empresa]
		 * @param  {[json]} idtb_empresas [id da empesa]
		 * @param  {[json]} nome          [nome da empresa]
		 * @param  {[json]} telefone      [telefone da empresa]
		 * @param  {[json]} email         [email da empresa]
		 * @param  {[json]} cidade        [cidade da empresa]
		 * @param  {[json]} estado        [Sigla do estado com dois dígitos]
		 * @return {[json]}               [empresa atualizada]
		 */
		update: (idtb_empresas,nome, telefone, email, cidade, estado) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Update tb_empresas set nome = ?, telefone = ?, email = ?, cidade = ?, estado = ? Where idtb_empresas = ?',[nome, telefone, email, cidade, estado, idtb_empresas],(error,results)=>{

					if(error || !results.affectedRows){
						errorHandler(error,'Falha ao atualizar', reject)
						return false
					}
					
					resolve({empresas: {idtb_empresas,nome, telefone, email, cidade, estado}, affectedRows: results.affectedRows})
				})
				
			})	
		},
 		/**
 		 * [SoftDel de empresa]
 		 * @param  {[json]} idtb_empresas [id a empresa]
 		 * @return {[json]}               [mensagem de sucesso/erro]
 		 */
	  	del: (idtb_empresas) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps				
				connection.query('Delete From tb_empresas Where idtb_empresas = ?',[idtb_empresas],(error,results)=>{
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



module.exports = empresas
