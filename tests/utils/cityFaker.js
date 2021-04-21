const { City } = require('../../src/domain/models')

const city = City.create({
    name: `cidade_teste${Date.now()}`,
    state: `estado_teste${Date.now()}`
  })

module.exports = city