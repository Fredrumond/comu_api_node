const ClientRepository = require('../repositories/ClientRepository')
const CityRepository = require('../repositories/CityRepository')
const { Client, City } = require('../domain/models')


const clientRepository = new ClientRepository(Client)
const cityRepository = new CityRepository(City)

module.exports = class ClientController {
    async create(request,response){
        const { name, sex, birth_date, age, id_city } = request.body
        try {
            if(!name){
                return response.status(400).json({message: 'O nome é obrigatório' })
            }
    
            if(!sex){
                return response.status(400).json({message: 'O sexo é obrigatório' })
            }

            if (typeof sex !== 'number') {
                return response.status(400).json({message: 'O sexo informado não é valido' })
            }

            if(!birth_date){
                return response.status(400).json({message: 'A data de nascimento é obrigatória' })
            }
    
            if(!age){
                return response.status(400).json({message: 'A idade é obrigatória' })
            }

            if(!id_city){
                return response.status(400).json({message: 'A cidade é obrigatória' })
            }

            const isValidCity = await cityRepository.findById(id_city)
            if(!isValidCity){
                return response.status(400).json({message: 'A cidade informada não foi encontrada' })
            }

            const client = await clientRepository.save(request.body)
            return response.status(201).json({message: 'Cliente cadastrado com sucesso' })

        } catch (error) {
            return response.status(500).json({message: '500' })
        }
        
    }
}