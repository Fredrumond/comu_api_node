module.exports = class CityRepository {
    constructor (model) {
      this.model = model
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
  