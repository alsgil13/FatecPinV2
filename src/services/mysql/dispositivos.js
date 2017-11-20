const dispositivos = deps => {
	return {
		save: (id_disp) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
				connection.query('Insert Into tb_dispositivos (idtb_dispositivos) Values(?)',[id_disp],(error,results)=>{
					if(error){
						errorHandler(error,'Falha ao salvar', reject)
						return false
					}
					resolve({dispositivo: {id_disp}})
				})
			})			
		}
	}
}

module.exports = dispositivos
