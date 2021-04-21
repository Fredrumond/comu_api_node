const request = require('supertest')
const app = require('../../src/main/app')

describe('Teste integracao cidade', () => {
    it('Deve retornar 400 se não foi informado o nome', async () => {
        const res = await request(app)
          .post('/cidade')
          .send({})
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('O nome é obrigatório')
      })

      it('Deve retornar 400 se não foi informado o estado', async () => {
        const res = await request(app)
          .post('/cidade')
          .send({
              nome: "cidade_qualquer"
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('O estado é obrigatório')
      })
  })
  