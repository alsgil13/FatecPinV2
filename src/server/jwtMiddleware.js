
const jwt = require('jsonwebtoken')


const jwtMiddleware = (deps) => {
	return async (req,res,next) => {
		const path = req.href().split("?")[0]
		if(!deps.exclusions.includes(path)){
			const token = req.headers['x-access-token'] 
			if(!token){
				res.send(403,{ error: 'Token nao fornecido'})
				return false
			}
			try{
				req.decoded = jwt.verify(token, process.env.JWT_SECRET)
			}catch(error){
				res.send(403,{ error: 'Falha ao autenticar o token'})
				return false
			}
		}
		next()
	}
}

module.exports = jwtMiddleware
