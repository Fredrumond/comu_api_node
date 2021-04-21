const request = require('supertest')
const app = require('../../src/main/app')

const { City } = require('../../src/domain/models')

const makeFakeCity = async () => {
  const city = await City.create({
    name: "cidade_teste",
    state: "estado_teste"
  })

  return city
}

describe('Teste integracao buscar cidade pelo estado', () => {
    it('Deve retornar 500 se não foi informado um query param permitido', async () => {
        const res = await request(app)
          .get('/cidade?busca=qualquer')

        expect(res.status).toEqual(500)
        expect(res.body.message).toEqual('Ação não disponivel')
      })

    it('Deve retornar 404 se a cidade informada não foi encontrada', async () => {
      const res = await request(app)
        .get('/cidade?estado=cidade')

      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Estado não encontrado')
    })

    it('Deve retornar 200 se a cidade informada foi encontrada', async () => {
      const fakeCity = await makeFakeCity()
      const res = await request(app)
        .get(`/cidade?estado=${fakeCity.state}`)

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Estado encontrado')
    })
  })
  