// const test = require('ava')
// const { connection, errorHandler } = require('./setup')
// const admins = require('../admins')({ connection, errorHandler })

// const create = () => admins.save('nome-admins','senha','admin@root.com',0)

// test.beforeEach(t => connection.query('truncate table tb_admins'))
// test.after.always(t => connection.query('truncate table tb_admins'))

// test('Criação de admins', async t => {
// 	const result = await create()
// 	t.is(result.admins.nome, 'nome-admins')
// 	//t.is(result.admins.id, 1)
// })

// test('Lista de Admins', async t => {
// 	await create()
// 	const list = await admins.all()
// 	t.is(list.admins.length, 1)
// })

// test('Item único Admins', async t => {
// 	await create()
// 	const result = await admins.item(1)
// 	t.is(result.admins[0].nome, 'nome-admins')
// })

// test('Atualização de Admins', async t => {
// 	await create()
// 	const updated = await admins.update(1,'novo-nome-admins','senha','admin@root.com',0)
// 	t.is(updated.affectedRows, 1)
// })

// test('Remoção de Admins', async t => {
// 	await create()
// 	const deleted = await admins.del(1)
// 	t.is(deleted.affectedRows, 1)
// })
