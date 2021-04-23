const HttpResponse = require('../helpers/http-response')
const CityRepository = require('../repositories/CityRepository')
const { City } = require('../domain/models')

const cityRepository = new CityRepository(City)


module.exports = class CityController {
    async create(request,response){
        const { name, state } = request.body
        const httpResponse = new HttpResponse(response)
        try {
            if(!name){
                return httpResponse.badRequest('O nome é obrigatório')
            }
    
            if(!state){
                return httpResponse.badRequest('O estado é obrigatório')
            }

            const city = await cityRepository.save(request.body)
            return httpResponse.created(city,'Cidade cadastrada com sucesso')

        } catch (error) {
            return httpResponse.serverError()
        }
        
    }

    async show(request,response){
        const { nome, estado } = request.query
        const httpResponse = new HttpResponse(response)
        try {
            if(nome){
                const city = await cityRepository.findByName(nome)
                
                if(city.length > 0)
                    return httpResponse.ok(city,'Cidade encontrada')

                return httpResponse.notFound('Cidade não encontrada')
            }

            if(estado){
                const city = await cityRepository.findByState(estado)
                
                if(city.length > 0)
                    return httpResponse.ok(city,'Estado encontrado')

                return httpResponse.notFound('Estado não encontrado')
            }

            return httpResponse.serverError('Ação não disponivel')
            
        } catch (error) {
            return httpResponse.serverError()
        }
    }
}