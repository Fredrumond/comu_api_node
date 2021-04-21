const request = require('supertest')
const app = require('../../src/main/app')

describe('Teste integracao buscar cidade', () => {
    it('Deve retornar 500 se não foi informado um query param permitido', async () => {
        const res = await request(app)
          .get('/cidade?busca=qualquer')

        expect(res.status).toEqual(500)
        expect(res.body.message).toEqual('Ação não disponivel')
      })

    it('Deve retornar 404 se a cidade informada não foi encontrada', async () => {
      const res = await request(app)
        .get('/cidade?nome=cidade')

      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Cidade não encontrada')
    })

    it('Deve retornar 200 se a cidade informada foi encontrada', async () => {
      const res = await request(app)
        .get('/cidade?nome=cidade_qualquer')

      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Cidade encontrada')
    })
  })
  