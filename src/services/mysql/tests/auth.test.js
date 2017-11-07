const test = require('ava')
const { connection, errorHandler } = require('./setup')
const admins = require('../admins')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

const create = () => admins.save('nome-admins','senha','admin@root.com',0)


test.beforeEach(t => connection.query('truncate table tb_admins'))
test.after.always(t => connection.query('truncate table tb_admins'))

test('Login - Sucesso', async t => {
	await create()
	const result = await auth.authenticate('admin@root.com','senha')
	t.not(result.token, null)
	t.not(result.token.length, 0)
})

test('Login - Falha', async t => {
	await create()
	const promise = auth.authenticate('rute@root.com','senha')
	const error = await t.throws(promise)
	t.is(error.error, 'Falha ao efetuar login')

})
