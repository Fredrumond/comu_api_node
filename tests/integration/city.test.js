const request = require('supertest')
const app = require('../../src/main/app')

describe('Teste integracao cidade', () => {
    it('Deve retornar 400 se não foi informado o nome', async () => {
        const res = await request(app)
          .post('/cidade')
          .send({})
        expect(res.status).toEqual(400)
      })
  })
  