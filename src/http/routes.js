
const db = require('../services/mysql')



const routes = (server) => {

//notícias
	server.get('noticias', async (req, res, next) => {
		
		//console.log(db.noticias())
		try{
			res.send(await db.noticias().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})
	server.get('noticias/:id', async (req, res, next) => {
		var id = req.params.id
		console.log(db.noticias())
		try{
			res.send(await db.noticias().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})
	server.post('noticias', async (req,res,next)=>{
		const { tb_admins_idtb_admins, titulo, texto, data_postagem, excluido, imagem } = req.params
		console.log(imagem)
		try{
			res.send(await db.noticias().save(tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido))
		}catch(error){
			res.send(error)
		}
		next()
	})
	server.del('noticias', async (req,res,next)=>{
		
		const { idtb_noticias } = req.params
		
		try{
			res.send(await db.noticias().del(idtb_noticias))
		}catch(error){
			res.send(error)
		}
		next()
	})
	server.put('noticias', async (req,res,next)=>{
		
		const { id_tbnoticias, tb_admins_idtb_admins, titulo, texto, data_postagem, excluido } = req.params
		
		try{
			res.send(await db.noticias().update(id_tbnoticias, tb_admins_idtb_admins, titulo, texto, data_postagem, excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	})

//############################################################################################### <--

//admins
	server.get('admins', async (req, res, next) => {
		
		console.log(db.admins())
		try{
			res.send(await db.admins().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})

	server.get('admins/:id', async (req, res, next) => {
		var id = req.params.id
		console.log(db.admins())
		try{
			res.send(await db.admins().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})

//empregos
	server.get('empregos', async (req, res, next) => {
		
		console.log(db.empregos())
		try{
			res.send(await db.empregos().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})

	server.get('empregos/:id', async (req, res, next) => {
		var id = req.params.id
		console.log(db.empregos())
		try{
			res.send(await db.empregos().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})

//empresa
	server.get('empresas', async (req, res, next) => {
		console.log(db.empresas())
		try{
			res.send(await db.empresas().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})
	server.get('empresas/:id', async (req, res, next) => {
		var id = req.params.id
		console.log(db.empresas())
		try{
			res.send(await db.empresas().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})



//evento

	server.get('eventos', async (req, res, next) => {
		console.log(db.eventos())
		try{
			res.send(await db.eventos().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})
	server.get('eventos/:id', async (req, res, next) => {
		var id = req.params.id
		console.log(db.eventos())
		try{
			res.send(await db.eventos().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})

//pins



	server.get('pins', async (req, res, next) => {
		console.log(db.pins())
		try{
			res.send(await db.pins().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})

	server.get('pins/:id', async (req, res, next) => {
		var id = req.params.id
		console.log(db.pins())
		try{
			res.send(await db.pins().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})



	server.get('/',(req,res,next)=>{
		res.send("enjoy the silence!!!")
		next()
	}) 

}




module.exports = routes

