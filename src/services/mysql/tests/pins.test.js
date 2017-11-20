const test = require('ava')
const { connection, errorHandler } = require('./setup')
const pins = require('../pins')({ connection, errorHandler })

const create = () => pins.save(1, 'descricao', '2017-10-29 11:18:00',0)

test.beforeEach(t => connection.query('truncate table tb_pins'))
test.after.always(t => connection.query('truncate table tb_pins'))

test('Criação de Pins', async t => {
	const result = await create()
	t.is(result.pins.descricao, 'descricao')
	t.is(result.pins.id, 1)
})

test('Lista de Pins', async t => {
	await create()
	const list = await pins.all()
	t.is(list.pins.length, 1)
})

test('Item único Pins', async t => {
	await create()
	const result = await pins.item(1)
	t.is(result.pins.descricao, 'descricao')
})

test('Atualização de Pins', async t => {
	await create()
	const updated = await pins.update(1,1, 'nova-descricao','2017-10-29 11:18:00',0)
	t.is(updated.pins.descricao, 'nova-descricao')
	t.is(updated.affectedRows, 1)
})

test('Remoção de Pins', async t => {
	await create()
	const deleted = await pins.del(1)
	t.is(deleted.affectedRows, 1)
})
