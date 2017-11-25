
const db = require('../services/mysql')


const routes = (server) => {

//Funções
//notícias
	const getNoticias = async (req, res, next) => {
		
		//console.log(db.noticias())
		try{
			res.send(await db.noticias().all())
		}catch(error){
			res.send(error)
		}
		next()			
	}
	
	const getNoticiasId = async (req, res, next) => {
		var id = req.params.id
		
		try{
			res.send(await db.noticias().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	}

	const postNoticias = async (req,res,next)=>{
		const { tb_admins_idtb_admins, titulo, texto, data_postagem, excluido, imagem } = req.params
		try{
			res.send(await db.noticias().save(tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido))
		}catch(error){
			res.send(error)
		}
		next()
	}

	const delNoticias = async (req,res,next)=>{
		
		const { idtb_noticias } = req.params
		
		try{
			res.send(await db.noticias().del(idtb_noticias))
		}catch(error){
			res.send(error)
		}
		next()
	}

	const putNoticias = async (req,res,next)=>{
		
		const { idtb_noticias, tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido } = req.params
		//console.log({ id_tbnoticias, tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido })
		try{
			res.send(await db.noticias().update(idtb_noticias, tb_admins_idtb_admins, titulo, texto, data_postagem, imagem, excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	}

//############################################################################################### <--

//admins
	const getAdmins =  async (req, res, next) => {
		
		
		try{
			res.send(await db.admins().all())
		}catch(error){
			res.send(error)
		}
		next()			
	}

	const getAdminsId = async (req, res, next) => {
		var id = req.params.id
		try{
			res.send(await db.admins().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	}

	const postAdmins = async (req,res,next)=>{
		const { nome,senha,email,excluido } = req.params
		try{
			res.send(await db.admins().save(nome,senha,email,excluido))
		}catch(error){
			res.send(error)
		}
		next()
	}
	const putAdmins = async (req,res,next)=>{
		
		const { idtb_admins,nome,senha,email,excluido } = req.params
		
		try{
			res.send(await db.empregos().admins(idtb_admins,nome,senha,email,excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	}

	const delAdmins = async (req,res,next)=>{
		
		const { idtb_admins } = req.params
		
		try{
			res.send(await db.admins().del(idtb_admins))
		}catch(error){
			res.send(error)
		}
		next()
	}


//############################################################################################### <--

//empregos
	const getEmpregos = async (req, res, next) => {
		
		
		try{
			res.send(await db.empregos().all())
		}catch(error){
			res.send(error)
		}
		next()			
	}

	const getEmpregosId = async (req, res, next) => {
		var id = req.params.id
		
		try{
			res.send(await db.empregos().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	}

	const postEmpregos = async (req,res,next)=>{
		const { tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga } = req.params
		try{
			res.send(await db.empregos().save(tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga))
		}catch(error){
			res.send(error)
		}
		next()
	}

	const putEmpregos = async (req,res,next)=>{
		
		const { idtb_empregos, tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo,texto, data_postagem, excluido, link_vaga } = req.params
		//console.log({ idtb_empregos, tb_empresa_idtb_empresa, tb_admins_idtb_admins, titulo,texto, data_postagem, excluido, link_vaga })
		try{
			res.send(await db.empregos().update(idtb_empregos, tb_empresa_idtb_empresa,tb_admins_idtb_admins, titulo,texto, data_postagem,excluido,link_vaga))
		}catch(error){
			res.send(error)
		}	
		next()
	}

	const delEmpregos = async (req,res,next)=>{
		
		const { idtb_empregos } = req.params
		
		try{
			res.send(await db.empregos().del(idtb_empregos))
		}catch(error){
			res.send(error)
		}
		next()
	}
//############################################################################################### <--


//empresa
	const getEmpresas = async (req, res, next) => {
		
		try{
			res.send(await db.empresas().all())
		}catch(error){
			res.send(error)
		}
		next()			
	}
	const getEmpresasId = async (req, res, next) => {
		var id = req.params.id
		
		try{
			res.send(await db.empresas().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	}
	const postEmpresas = async (req,res,next)=>{
		const { nome, telefone, email, cidade, estado } = req.params
		try{
			res.send(await db.empresas().save(nome, telefone, email, cidade, estado))
		}catch(error){
			res.send(error)
		}
		next()
	}
	const putEmpresas = async (req,res,next)=>{
		
		const { id_empresa, nome, telefone, email, cidade, estado } = req.params
		
		try{
			res.send(await db.empresas().update(id_empresa, nome, telefone, email, cidade, estado))
		}catch(error){
			res.send(error)
		}	
		next()
	}
	const delEmpresas = async (req,res,next)=>{
		
		const { id_empresa } = req.params
		
		try{
			res.send(await db.empresas().del(id_empresa))
		}catch(error){
			res.send(error)
		}
		next()
	}
//############################################################################################### <--



//evento

	const getEventos = async (req, res, next) => {
		
		try{
			res.send(await db.eventos().all())
		}catch(error){
			res.send(error)
		}
		next()			
	}
	const getEventosId = async (req, res, next) => {
		var id = req.params.id
		
		try{
			res.send(await db.eventos().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	}
	const postEventos = async (req,res,next)=>{
		const { tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, excluido } = req.params
		try{
			res.send(await db.eventos().save(tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, excluido))
		}catch(error){
			res.send(error)
		}
		next()
	}

	const putEventos = async (req,res,next)=>{
		
		const { idtb_eventos, tb_admins_idtb_admins, titulo, texto, data_postagem, local_evento, data_evento, excluido } = req.params
		
		try{
			res.send(await db.eventos().update(idtb_eventos, tb_admins_idtb_admins, titulo, texto, data_postagem, data_evento, local_evento, excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	}

	const delEventos = async (req,res,next)=>{
		
		const { idtb_eventos } = req.params
		
		try{
			res.send(await db.eventos().del(idtb_eventos))
		}catch(error){
			res.send(error)
		}
		next()
	}
//############################################################################################### <--


//pins



	const getPins = async (req, res, next) => {				
		try {
			const filter = req.query			
			res.send(await db.pins().all(filter))
		} catch(error){
			res.send(error)
		}
		next()			
	}

	const getPinsId = async (req, res, next) => {
		var id = req.params.id		
		try{
			res.send(await db.pins().item(id))
		}catch(error){
			res.send(error)
		}
		next()			
	}

	const postPins = async (req,res,next)=>{
		const { tb_admins_idtb_admins, descricao, data_postagem, excluido } = req.params
		res.send(req.params)
		next()

		try{
			res.send(await db.pins().save(tb_admins_idtb_admins, descricao, data_postagem, excluido))
		}catch(error){
			res.send(error)
		}
		next()
	}

	const putPins = async (req,res,next)=>{
		
		const { idtb_pins, tb_admins_idtb_admins, descricao, data_postagem, excluido } = req.params
		try{
			res.send(await db.pins().update(idtb_pins, tb_admins_idtb_admins, descricao, data_postagem, excluido))
		}catch(error){
			res.send(error)
		}	
		next()
	}

	const delPins = async (req,res,next)=>{
		
		const { idtb_pins } = req.params
		
		try{
			res.send(await db.pins().del(idtb_pins))
		}catch(error){
			res.send(error)
		}
		next()
	}

// Autenticação
	const postAutenticacao = async (req, res, next) => {
		const { email, senha } = req.params		
		try{	
			res.send(await db.auth().authenticate(email,senha))
		}catch(error){
			res.send(error)
		}
		next()			
	}
/////////////////////////////////////////////////////////////////////////

// Dispositivo
	const postDispositivo = async (req, res, next) => {
		const { id_dispositivo } = req.params
		
		try{
			//console.log(db)
			//res.send(await db.auth().authenticate(email,senha))
			res.send(await db.dispositivos().save(id_dispositivo))
		}catch(error){
			res.send(error)
			console.log(error)
		}
		
		next()			
	}

//Rotas

server.post('public/dispositivos', postDispositivo)

server.get('public/noticias', getNoticias)
server.get('public/noticias/:id', getNoticiasId)
server.post('private/noticias', postNoticias)
server.put('private/noticias', putNoticias)
server.del('private/noticias',delNoticias)

server.get('private/admins', getAdmins)
server.get('private/admins/:id', getAdminsId)
server.post('private/admins', postAdmins)
server.put('private/admins', putAdmins)
server.del('private/admins',delAdmins)

server.get('public/empregos', getEmpregos)
server.get('public/empregos/:id', getEmpregosId)
server.post('private/empregos', postEmpregos)
server.put('private/empregos', putEmpregos)
server.del('private/empregos',delEmpregos)

server.get('private/empresas', getEmpresas)
server.get('private/empresas/:id', getEmpresasId)
server.post('private/empresas', postEmpresas)
server.put('private/empresas', putEmpresas)
server.del('private/empresas',delEmpresas)

server.get('public/eventos', getEventos)
server.get('public/eventos/:id', getEventosId)
server.post('private/eventos', postEventos)
server.put('private/eventos', putEventos)
server.del('private/eventos',delEventos)

server.get('public/pins', getPins)
server.get('public/pins/:id', getPinsId)
server.get('private/pins', postPins)
server.post('private/pins', postPins)
server.put('private/pins', putPins)
server.del('private/pins',delPins)

server.post('public/autenticacao',postAutenticacao)



}




module.exports = routes

