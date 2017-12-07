const dispositivos = deps => {
	return {
		/**
		 * [Adiciona dispositivo]
		 * 
		 * @param  {[json]} id_disp [id único do dispositivo]
		 * @return {[json]}         [id do dispositivo se não existir e mensagem se já existir no banco]
		 */
		save: (id_disp) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Insert Into tb_dispositivos (idtb_dispositivos) Values(?)',[id_disp],(error,results)=>{
					if(error){
						errorHandler(error,'Dispositivo já existente', reject)
						return false
					}
					resolve({dispositivo: {id_disp}})
				})
			})			
		}
	}
}

module.exports = dispositivos
