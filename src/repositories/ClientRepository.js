module.exports = class ClientRepository {
    constructor (model) {
      this.model = model
    }

    async findByName (name) {
      const client = await this.model.findOne({ where: { name: name } })
      return client
    }
  
    async save (data) {
      const { name, sex, birth_date, age, id_city } = data

      const dateBirth = birth_date.split("/")
      const convertDateBirth = dateBirth[2] + '-' + dateBirth[0] + '-' + dateBirth[1]

      const client = await this.model.create({
        name,
        sex,
        birth_date: convertDateBirth,
        age,
        id_city
      })
  
      return client
    }
  
   
  }
  