const test = require('ava')
const { connection, errorHandler } = require('./setup')
const empresas = require('../empresas')({ connection, errorHandler })

const create = () => empresas.save('nome-empresa', 'telefone', 'email','cidade','UF')


 test.beforeEach(t => connection.query('truncate table tb_empresas'))
 test.after.always(t => connection.query('truncate table tb_empresas'))

test('Criação de empresas', async t => {
	const result = await create()
	t.is(result.empresas.nome, 'nome-empresa')
	t.is(result.empresas.id, 1)
})

test('Lista de Empresas', async t => {
	await create()
	const list = await empresas.all()
	t.is(list.empresas.length, 1)
})

test('Item único Empresas', async t => {
	await create()
	const result = await empresas.item(1)
	t.is(result.empresas[0].nome, 'nome-empresa')
})

test('Atualização de empresas', async t => {
	await create()
	const updated = await empresas.update(1,'NOVO NOME nome-empresa', 'telefone', 'email','cidade','UF')
	t.is(updated.empresas.nome, 'NOVO NOME nome-empresa')
	t.is(updated.affectedRows, 1)
})

test('Remoção de empresas', async t => {
	await create()
	const deleted = await empresas.del(1)
	t.is(deleted.affectedRows, 1)
})
