const request = require('supertest')
const app = require('../../src/main/app')
const clientFaker = require('../utils/clientFaker')

const MAIN_ROUTE = '/cliente';

describe('Teste integracao buscar cliente pelo nome', () => {
    it('Deve retornar 500 se não foi informado um query param permitido', async () => {
        const res = await request(app)
          .get(`${MAIN_ROUTE}?busca=qualquer`)

        expect(res.status).toEqual(500)
        expect(res.body.message).toEqual('Ação não disponivel')
      })

    it('Deve retornar 404 se o cliente informado não foi encontrado', async () => {
      const res = await request(app)
        .get(`${MAIN_ROUTE}?nome=aleatorio${Date.now()}`)

      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Cliente não encontrado')
    })

    it('Deve retornar 200 se o cliente informado foi encontrado', async () => {
      const fakeClient = await clientFaker
      const res = await request(app)
        .get(`${MAIN_ROUTE}?nome=${fakeClient.name}`)

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Cliente encontrado')
    })

    it('Deve retornar 200 se o cliente informado pelo id foi encontrado', async () => {
      const fakeClient = await clientFaker
      const res = await request(app)
        .get(`${MAIN_ROUTE}/${fakeClient.id}`)

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Cliente encontrado')
    })
  })
  