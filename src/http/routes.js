
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
		
		
		try{
			res.send(await db.admins().all())
		}catch(error){
			res.send(error)
		}
		next()			
	})

	server.get('admins/:id', async (req, res, next) => {
		var id = req.params.id
		try{
			res.send(await db.admins().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	})

	server.post('admins', async (req,res,next)=>{
		const { nome,senha,email,excluido } = req.params
		try{
			res.send(await db.admins().save(nome,senha,email,excluido))
		}catch(error){
			res.send(error)
		}
		next()
	})
	server.put('admins', async (req,res,next)=>{
		
		const { idtb_admins,nome,senha,email,excluido } = req.params
		
		try{
			res.send(await db.empregos().admins(idtb_admins,nome,senha,email,excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	})

	server.del('admins', async (req,res,next)=>{
		
		const { idtb_admins } = req.params
		
		try{
			res.send(await db.admins().del(idtb_admins))
		}catch(error){
			res.send(error)
		}
		next()
	})


//############################################################################################### <--

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

	server.post('empregos', async (req,res,next)=>{
		const { tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga } = req.params
		try{
			res.send(await db.noticias().save(tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga))
		}catch(error){
			res.send(error)
		}
		next()
	})
	server.put('empregos', async (req,res,next)=>{
		
		const { idtb_emprego, tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga } = req.params
		
		try{
			res.send(await db.empregos().update(idtb_emprego, tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga))
		}catch(error){
			res.send(error)
		}	
		next()
	})

	server.del('empregos', async (req,res,next)=>{
		
		const { idtb_empregos } = req.params
		
		try{
			res.send(await db.empregos().del(idtb_empregos))
		}catch(error){
			res.send(error)
		}
		next()
	})
//############################################################################################### <--


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
	server.post('empresas', async (req,res,next)=>{
		const { nome, telefone, email, cidade, estado } = req.params
		try{
			res.send(await db.noticias().save(nome, telefone, email, cidade, estado))
		}catch(error){
			res.send(error)
		}
		next()
	})
	server.put('empresas', async (req,res,next)=>{
		
		const { id_empresa, nome, telefone, email, cidade, estado } = req.params
		
		try{
			res.send(await db.empresas().update(id_empresa, nome, telefone, email, cidade, estado))
		}catch(error){
			res.send(error)
		}	
		next()
	})
	server.del('empresas', async (req,res,next)=>{
		
		const { idtb_empresas } = req.params
		
		try{
			res.send(await db.empresas().del(idtb_noticias))
		}catch(error){
			res.send(error)
		}
		next()
	})
//############################################################################################### <--



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
	server.post('eventos', async (req,res,next)=>{
		const { tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, excluido } = req.params
		try{
			res.send(await db.eventos().save(tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, excluido))
		}catch(error){
			res.send(error)
		}
		next()
	})

	server.put('eventos', async (req,res,next)=>{
		
		const { idtb_eventos, tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, link_evento, excluido } = req.params
		try{
			res.send(await db.eventos().update(idtb_eventos, tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, link_evento, excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	})

	server.del('eventos', async (req,res,next)=>{
		
		const { idtb_eventos } = req.params
		
		try{
			res.send(await db.eventos().del(idtb_eventos))
		}catch(error){
			res.send(error)
		}
		next()
	})
//############################################################################################### <--


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

	server.post('pins', async (req,res,next)=>{
		const { tb_admins_idtb_admins, descricao, data_postagem, excluido } = req.params
		try{
			res.send(await db.pins().save(tb_admins_idtb_admins, descricao, data_postagem, excluido))
		}catch(error){
			res.send(error)
		}
		next()
	})

	server.put('pins', async (req,res,next)=>{
		
		const { idtb_pins, tb_admins_idtb_admins, descricao, data_postagem, excluido } = req.params
		try{
			res.send(await db.pins().update(idtb_pins, tb_admins_idtb_admins, descricao, data_postagem, excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	})

	server.del('pins', async (req,res,next)=>{
		
		const { idtb_pins } = req.params
		
		try{
			res.send(await db.pins().del(idtb_pins))
		}catch(error){
			res.send(error)
		}
		next()
	})
//############################################################################################### <--
	server.post('autenticacao', async (req, res, next) => {
		const { email, senha } = req.params		
		try{	
			res.send(await db.auth().authenticate(email,senha))
		}catch(error){
			res.send(error)
		}
		next()			
	})
/////////////////////////////////////////////////////////////////////////

}




module.exports = routes

