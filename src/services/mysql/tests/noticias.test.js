const test = require('ava')

const { connection, errorHandler } = require('./setup')

const noticias = require('../noticias')({ connection, errorHandler })

const create = () => noticias.save(1, 'titulo', 'texto', '2017-10-29 11:18:00',null,0)

test.beforeEach(t => connection.query('truncate table tb_noticias'))

test.after.always(t => connection.query('truncate table tb_noticias'))

test('Criação de Noticias', async t => {
	const result = await create()
	t.is(result.noticias.titulo, 'titulo')
	t.is(result.noticias.id, 1)
})

test('Lista de Notícias', async t => {
	await create()
	const list = await noticias.all()
	t.is(list.noticias.length, 1)
})

test('Item único Notícias', async t => {
	await create()
	const result = await noticias.item(1)
	t.is(result.noticia.titulo, 'titulo')
})

test('Atualização de Noticias', async t => {
	await create()

	const updated = await noticias.update(1,1, 'novo-titulo', 'novo-texto', '2017-10-29 11:18:00',null,0)
	t.is(updated.noticias.titulo, 'novo-titulo')
	t.is(updated.affectedRows, 1)
})

test('Remoção de Noticias', async t => {
	await create()
	const deleted = await noticias.del(1)
	t.is(deleted.affectedRows, 1)
})
