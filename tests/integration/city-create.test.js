const request = require('supertest')
const app = require('../../src/main/app')

const MAIN_ROUTE = '/cidade';

let city = {
  name: `cidade${Date.now()}`,
  state: `estado${Date.now()}`
}

describe('Teste integracao criar cidade', () => {
    describe('Ao tentar inserir uma cidade invalida', () => {
      const registerNewCityTemplate = async (newData, errorMessage) => {
          const res = await request(app)
          .post(`${MAIN_ROUTE}`)
          .send({
            ...city, ...newData
          })
          
          expect(res.status).toEqual(400)
          expect(res.body.message).toEqual(errorMessage)
        }

      test('Deve retornar 400 se não foi informado o nome', async () => {
          await registerNewCityTemplate({ name: null }, 'O nome é obrigatório')
      })

      test('Deve retornar 400 se não foi informado o estado', async () => {
          await registerNewCityTemplate({ state: null }, 'O estado é obrigatório')
      })

    })

    it('Deve retornar 201 se a cidade foi cadastrada', async () => {
      const res = await request(app)
        .post(`${MAIN_ROUTE}`)
        .send(city)
      expect(res.status).toEqual(201)
      expect(res.body.message).toEqual('Cidade cadastrada com sucesso')
    })
  })
  