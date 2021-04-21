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

    async show(request,response){
        const { nome } = request.query
        const { id } = request.params

        try {
            if(nome){
                const client = await clientRepository.findByName(nome)
                if(client.length > 0)
                    return response.status(200).json({client, message: 'Cliente encontrado' })

                return response.status(404).json({message: 'Cliente não encontrado' })
            }

            if(id){
                const client = await clientRepository.findById(id)
                if(client)
                    return response.status(200).json({client, message: 'Cliente encontrado' })
            }

            return response.status(500).json({message: 'Ação não disponivel' })

            
        } catch (error) {
            console.log(error)
            return response.status(500).json({message: 'Ação não disponivel' })
        }
    }

    async delete(request,response){
        const { id } = request.params

        try {
            const client = await clientRepository.findById(id)
            
            if (client) {
                await clientRepository.destroy(client)
                return response.status(200).json({message: 'Cliente removido' })
            }

            return response.status(404).json({message: 'Cliente não encontrado' })
            
        } catch (error) {
            console.log(error)
            return response.status(500).json({message: 'Tente novamente mais tarde' })
        }
    }

    async update(request,response){
        const { id } = request.params

        try {

            const client = await clientRepository.findById(id)

            if (client) {
                await clientRepository.update(client,request.body)
                return response.status(200).json({message: 'Cliente atualizado' })
            }

            return response.status(404).json({message: 'Cliente não encontrado' })
            
        } catch (error) {
            console.log(error)
            return response.status(500).json({message: 'Tente novamente mais tarde' })
        }
    }
}