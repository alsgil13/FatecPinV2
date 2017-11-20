	
const sha1 = require('sha1')

const jwt = require('jsonwebtoken')

const auth = deps => {
	return {
		authenticate: (email,senha) => {
			return new Promise((resolve, reject)=>{
			const { connection, errorHandler } = deps
			const queryString = 'Select idtb_admins, email from tb_admins Where email = ? And senha = ?'
			const queryData = [email,sha1(senha)]
				connection.query(queryString,queryData,(error,results)=>{
					if(error || !results.length){
						errorHandler(error,'Falha ao efetuar login', reject)
						return false
					}
					const {email, idtb_admins} = results[0]
					const token = jwt.sign({email,idtb_admins}, process.env.JWT_SECRET ,{ expiresIn: 60 * 60 * 60})
					
					resolve({token})

				})
			})			
		}
	}
}



module.exports = auth