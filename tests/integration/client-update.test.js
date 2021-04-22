const request = require('supertest')
const app = require('../../src/main/app')
const clientFaker = require('../utils/clientFaker')

const MAIN_ROUTE = '/cliente';

describe('Teste integracao update nome cliente', () => {
  it('Deve retornar 404, se o cliente não for registrado', async () => {
    const res = await request(app)
        .delete(`${MAIN_ROUTE}/99`)

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('Cliente não encontrado')
  })

  it('Deve retornar 200, se o cliente informado teve o nome alterado', async () => {
    const fakeClient = await clientFaker
    const res = await request(app)
      .patch(`${MAIN_ROUTE}/${fakeClient.id}`)
      .send({
        name: "nome_alterado"
      })

    expect(res.status).toEqual(200)
    expect(res.body.message).toEqual('Cliente atualizado')
  })
})
