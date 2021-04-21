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



describe('Teste integracao buscar cliente pelo nome', () => {
    it('Deve retornar 500 se não foi informado um query param permitido', async () => {
        const res = await request(app)
          .get('/cliente?busca=qualquer')

        expect(res.status).toEqual(500)
        expect(res.body.message).toEqual('Ação não disponivel')
      })

    it('Deve retornar 404 se o cliente informado não foi encontrado', async () => {
      const res = await request(app)
        .get(`/cliente?nome=aleatorio${Date.now()}`)

      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Cliente não encontrado')
    })

    it('Deve retornar 200 se o cliente informado foi encontrado', async () => {
      const fakeClient = await makeFakeClient()
      const res = await request(app)
        .get(`/cliente?nome=${fakeClient.name}`)

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Cliente encontrado')
    })

    it('Deve retornar 200 se o cliente informado pelo id foi encontrado', async () => {
      const fakeClient = await makeFakeClient()
      const res = await request(app)
        .get(`/cliente/${fakeClient.id}`)

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Cliente encontrado')
    })
  })
  