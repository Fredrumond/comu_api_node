const { Op } = require("sequelize");

module.exports = class CityRepository {
    constructor (model) {
      this.model = model
    }

    async findById (id) {
      const city = await this.model.findByPk(id)
      return city
    }

    async findByName (name) {
      const query = `%${name}%`
      const city = await this.model.findAll({ where: { name: {[Op.like]: query} } })
      return city
    }

    async findByState (state) {
      const query = `%${state}%`
      const city = await this.model.findAll({ where: { state: {[Op.like]: query} } })
      return city
    }
  
    async save (data) {
      const { name, state } = data
      const city = await this.model.create({
        name,
        state
      })
  
      return city
    }
  
   
  }
  