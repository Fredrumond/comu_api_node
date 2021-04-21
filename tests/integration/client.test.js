const request = require('supertest')
const app = require('../../src/main/app')

describe('Teste integracao cliente', () => {
    it('Deve retornar 400 se não foi informado o nome', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({})
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('O nome é obrigatório')
      })

      it('Deve retornar 400 se não foi informado o sexo', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer"
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('O sexo é obrigatório')
      })

      it('Deve retornar 400 se o sexo informado é inválido', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: "sexo_qualquer"
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('O sexo informado não é valido')
      })

      it('Deve retornar 400 se não foi informado a data de nascimento', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: 1,
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('A data de nascimento é obrigatória')
      })

      it('Deve retornar 400 se não foi informado a idade', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: 1,
              birth_date: "08/02/1993",
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('A idade é obrigatória')
      })

      it('Deve retornar 400 se não foi informado a cidade', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: 1,
              birth_date: "08/02/1993",
              age: 28
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('A cidade é obrigatória')
      })

      it('Deve retornar 400 se a cidade informada não for um id', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: 1,
              birth_date: "08/02/1993",
              age: 28,
              id_city: 'cidade_qualquer'
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('A cidade informada não foi encontrada')
      })

      it('Deve retornar 400 se a cidade informada não foi encontrada', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: 1,
              birth_date: "08/02/1993",
              age: 28,
              id_city: 99
          })
        expect(res.status).toEqual(400)
        expect(res.body.message).toEqual('A cidade informada não foi encontrada')
      })

      it('Deve retornar 201 se o cliente foi cadastrado', async () => {
        const res = await request(app)
          .post('/cliente')
          .send({
              name: "nome_qualquer",
              sex: 1,
              birth_date: "08/02/1993",
              age: 28,
              id_city: 1
          })
        expect(res.status).toEqual(201)
        expect(res.body.message).toEqual('Cliente cadastrado com sucesso')
      })
  })
  