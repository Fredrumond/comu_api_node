const CityRepository = require('../repositories/CityRepository')
const { City } = require('../domain/models')

const cityRepository = new CityRepository(City)

module.exports = class CityController {
    async create(request,response){
        const { name, state } = request.body
        try {
            if(!name){
                return response.status(400).json({message: 'O nome é obrigatório' })
            }
    
            if(!state){
                return response.status(400).json({message: 'O estado é obrigatório' })
            }

            const city = await cityRepository.save(request.body)
            return response.status(201).json({message: 'Cidade cadastrada com sucesso' })

        } catch (error) {
            console.log(error)
            return response.status(500).json({message: '500' })
        }
        
    }

    async show(request,response){
        const { nome, estado } = request.query
        try {
            if(nome){
                const city = await cityRepository.findByName(nome)
                
                if(city.length > 0)
                    return response.status(200).json({city, message: 'Cidade encontrada' })

                return response.status(404).json({message: 'Cidade não encontrada' })
            }

            if(estado){
                const city = await cityRepository.findByEstado(estado)
                
                if(city.length > 0)
                    return response.status(200).json({city, message: 'Estado encontrado' })

                return response.status(404).json({message: 'Estado não encontrado' })
            }

            return response.status(500).json({message: 'Ação não disponivel' })

            
        } catch (error) {
            return response.status(500).json({message: 'Ação não disponivel' })
        }
    }
}