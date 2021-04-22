const request = require('supertest')
const app = require('../../src/main/app')
const cityFaker = require('../utils/cityFaker')

const MAIN_ROUTE = '/cidade';

describe('Teste integracao buscar cidade pelo nome', () => {
    it('Deve retornar 500 se não foi informado um query param permitido', async () => {
        const res = await request(app)
          .get(`${MAIN_ROUTE}?busca=qualquer`)

        expect(res.status).toEqual(500)
        expect(res.body.message).toEqual('Ação não disponivel')
      })

    it('Deve retornar 404 se a cidade informada não foi encontrada', async () => {
      const res = await request(app)
        .get(`${MAIN_ROUTE}?nome=aleatoria`)

      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Cidade não encontrada')
    })

    it('Deve retornar 200 se a cidade informada foi encontrada', async () => {
      const fakeCity = await cityFaker
      const res = await request(app)
        .get(`${MAIN_ROUTE}?nome=${fakeCity.name}`)

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Cidade encontrada')
    })
  })
  