module.exports = class ClientRepository {
    constructor (model) {
      this.model = model
    }

    async findById (id) {
      const client = await this.model.findByPk(id)
      return client
    }

    async findByName (name) {
      const client = await this.model.findAll({ where: { name: name } })
      return client
    }
  
    async save (data) {
      const { name, sex, birth_date, age, id_city } = data

      const dateBirth = birth_date.split("/")
      const convertDateBirth = dateBirth[2] + '-' + dateBirth[1] + '-' + dateBirth[0]

      const client = await this.model.create({
        name,
        sex,
        birth_date: convertDateBirth,
        age,
        id_city
      })
  
      return client
    }

    async destroy (client) {
      const clientDestroy = await client.destroy()
      return clientDestroy
    }

    async update (client, data) {
      const { name } = data
  
      const clientUpdate = await client.update({
        name
      })
  
      return clientUpdate
    }
  
   
  }
  