
const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
	return async (req,res,next) => {
		if(req.href().split("/")[1] === "private"){ //quebra a URL e checa se tem private na primeira trilha
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
