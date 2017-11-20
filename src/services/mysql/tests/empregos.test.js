const test = require('ava')
const { connection, errorHandler } = require('./setup')
const empregos = require('../empregos')({ connection, errorHandler })

const create = () => empregos.save(1,1,'titulo do emprego', 'texto', '2017-10-29 11:18:00',0,'link da vaga')


test.beforeEach(t => connection.query('truncate table tb_empregos'))
test.after.always(t => connection.query('truncate table tb_empregos'))

test('Criação de empregos', async t => {
	const result = await create()
	t.is(result.empregos.titulo, 'titulo do emprego')
	t.is(result.empregos.id, 1)
})

test('Lista de Empregos', async t => {
	await create()
	const list = await empregos.all()
	t.is(list.empregos.length, 1)
})

test('Item único Empregos', async t => {
	await create()
	const result = await empregos.item(1)
	t.is(result.emprego.titulo, 'titulo do emprego')
})

test('Atualização de Empregos', async t => {
	await create()
	const updated = await empregos.update(1,1,1,'novo emprego', 'texto', '2017-10-29 11:18:00',0,'link da vaga')
	t.is(updated.empregos.titulo, 'novo emprego')
	t.is(updated.affectedRows, 1)
})

test('Remoção de Empregos', async t => {
	await create()
	const deleted = await empregos.del(1)
	t.is(deleted.affectedRows, 1)
})
