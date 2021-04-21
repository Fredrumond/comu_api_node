const { Client } = require('../../src/domain/models')
const cityFaker = require('../utils/cityFaker')

const makeFakeCity = async () => {
  const city = await cityFaker
  return city
}

const makeFakeClient = async () => {
  const fakeCity = await makeFakeCity()
  const client = await Client.create({
    name: `nome_qualquer${Date.now()}`,
    sex: 1,
    birth_date: "1993-08-02",
    age: 28,
    id_city: fakeCity.id
  })

  return client
}

module.exports = makeFakeClient()