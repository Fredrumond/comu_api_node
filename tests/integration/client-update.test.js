const request = require('supertest')
const app = require('../../src/main/app')

const { City, Client } = require('../../src/domain/models')

const makeFakeCity = async () => {
  const city = await City.create({
    name: "cidade_teste",
    state: "estado_teste"
  })

  return city
}

const makeFakeClient = async () => {
  const fakeCity = await makeFakeCity()
  const client = await Client.create({
    name: "nome_qualquer",
    sex: 1,
    birth_date: "1993-08-02",
    age: 28,
    id_city: fakeCity.id
  })

  return client
}

describe('Teste integracao update nome cliente', () => {
  it('Deve retornar 404, se o cliente não for registrado', async () => {
    const res = await request(app)
        .delete(`/cliente/99`)

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('Cliente não encontrado')
  })

  it('Deve retornar 200, se o cliente informado teve o nome alterado', async () => {
    const fakeClient = await makeFakeClient()
      const res = await request(app)
        .patch(`/cliente/${fakeClient.id}`)
        .send({
          name: "nome_alterado"
        })

    expect(res.status).toEqual(200)
    expect(res.body.message).toEqual('Cliente atualizado')
  })
})
