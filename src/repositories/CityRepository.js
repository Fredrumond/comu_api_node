module.exports = class CityRepository {
    constructor (model) {
      this.model = model
    }

    async findById (id) {
      const city = await this.model.findByPk(id)
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
  