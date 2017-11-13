const test = require('ava')
const { connection, errorHandler } = require('./setup')
const eventos = require('../eventos')({ connection, errorHandler })

const create = () => eventos.save(1, 'titulo','texto','2017-10-29 11:18:00','2017-10-29 11:18:00','local',0)

test.beforeEach(t => connection.query('truncate table tb_eventos'))
//test.after.always(t => connection.query('truncate table tb_eventos'))

test('Criação de eventos', async t => {
	const result = await create()
	t.is(result.eventos.titulo, 'titulo')
	t.is(result.eventos.id, 1)
})

test('Lista de Eventos', async t => {
	await create()
	const list = await eventos.all()
	t.is(list.eventos.length, 1)
})

test('Item único Eventos', async t => {
	await create()
	const result = await eventos.item(1)
	t.is(result.eventos[0].titulo, 'titulo')
})

test('Atualização de Eventos', async t => {
	await create()
	const updated = await eventos.update(1,1, 'novo-titulo','novo-texto','2017-10-29 11:18:00','2017-10-29 11:18:00','local',0)
	t.is(updated.eventos.titulo, 'novo-titulo')
	t.is(updated.affectedRows, 1)
})

test('Remoção de Eventos', async t => {
	await create()
	const deleted = await eventos.del(1)
	t.is(deleted.affectedRows, 1)
})
