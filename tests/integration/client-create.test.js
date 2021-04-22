const request = require('supertest')
const app = require('../../src/main/app')

const MAIN_ROUTE = '/cliente';

let client = {
  name: `client${Date.now()}`,
  sex: 1,
  birth_date: "08/02/1993",
  age: 28,
  id_city: 1
}

describe('Teste integracao cliente', () => {
  describe('Ao tentar inserir um cliente invalido', () => {
    const registerNewClientTemplate = async (newData, errorMessage) => {
        const res = await request(app)
        .post(`${MAIN_ROUTE}`)
        .send({
          ...client, ...newData
        })
        
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual(errorMessage)
      }

    test('Deve retornar 400 se não foi informado o nome', async () => {
        await registerNewClientTemplate({ name: null }, 'O nome é obrigatório')
    })

    test('Deve retornar 400 se não foi informado o sexo', async () => {
        await registerNewClientTemplate({ sex: null }, 'O sexo é obrigatório')
    })

    test('Deve retornar 400 se o sexo informado é inválido', async () => {
        await registerNewClientTemplate({ sex: 'sex' }, 'O sexo informado não é valido')
    })

    test('Deve retornar 400 se não foi informado a data de nascimento', async () => {
        await registerNewClientTemplate({ birth_date: null }, 'A data de nascimento é obrigatória')
    })

    test('Deve retornar 400 se não foi informado a idade', async () => {
        await registerNewClientTemplate({ age: null }, 'A idade é obrigatória')
    })

    test('Deve retornar 400 se a idade informada é invalida', async () => {
      await registerNewClientTemplate({ age: 'age' }, 'A idade informada não é valida')
  })

    test('Deve retornar 400 se não foi informado a cidade', async () => {
        await registerNewClientTemplate({ id_city: null }, 'A cidade é obrigatória')
    })

    test('Deve retornar 400 se a cidade informada não for um id', async () => {
        await registerNewClientTemplate({ id_city: 'cidade_qualquer' }, 'A cidade informada não foi encontrada')
    })

    test('Deve retornar 400 se a cidade informada não foi encontrada', async () => {
        await registerNewClientTemplate({ id_city: 99 }, 'A cidade informada não foi encontrada')
    })

  })

  it('Deve retornar 201 se o cliente foi cadastrado', async () => {
    const res = await request(app)
      .post(`${MAIN_ROUTE}`)
      .send(client)
    expect(res.status).toEqual(201)
    expect(res.body.message).toEqual('Cliente cadastrado com sucesso')
  })
})
  