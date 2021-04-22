const HttpResponse = require('../helpers/http-response')
const ClientRepository = require('../repositories/ClientRepository')
const CityRepository = require('../repositories/CityRepository')
const { Client, City } = require('../domain/models')


const clientRepository = new ClientRepository(Client)
const cityRepository = new CityRepository(City)

module.exports = class ClientController {
    async create(request,response){
        const { name, sex, birth_date, age, id_city } = request.body
        const httpResponse = new HttpResponse(response)
        try {
            if(!name){
                return httpResponse.badRequest('O nome é obrigatório')
            }
    
            if(!sex){
                return httpResponse.badRequest('O sexo é obrigatório')
            }

            if (typeof sex !== 'number') {
                return httpResponse.badRequest('O sexo informado não é valido')
            }

            if(!birth_date){
                return httpResponse.badRequest('A data de nascimento é obrigatória')
            }

            if(!birth_date.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)){
                return httpResponse.badRequest('A data de nascimento informada não é valida. Insira como dd/mm/yyyy')
            }
    
            if(!age){
                return httpResponse.badRequest('A idade é obrigatória')
            }

            if (typeof age !== 'number') {
                return httpResponse.badRequest('A idade informada não é valida')
            }

            if(!id_city){
                return httpResponse.badRequest('A cidade é obrigatória')
            }

            const isValidCity = await cityRepository.findById(id_city)
            if(!isValidCity){
                return httpResponse.badRequest('A cidade informada não foi encontrada')
            }

            const client = await clientRepository.save(request.body)
            return httpResponse.created(client,'Cliente cadastrado com sucesso')

        } catch (error) {
            return httpResponse.serverError()
        }
        
    }

    async show(request,response){
        const { nome } = request.query
        const { id } = request.params
        const httpResponse = new HttpResponse(response)

        try {
            if(nome){
                const client = await clientRepository.findByName(nome)
                if(client.length > 0)
                    return httpResponse.ok(client,'Cliente encontrado')

                return httpResponse.notFound('Cliente não encontrado')
            }

            if(id){
                const client = await clientRepository.findById(id)
                if(client)
                    return httpResponse.ok(client,'Cliente encontrado')
            }

            return httpResponse.serverError('Ação não disponivel')

            
        } catch (error) {
            return httpResponse.serverError()
        }
    }

    async delete(request,response){
        const { id } = request.params
        const httpResponse = new HttpResponse(response)

        try {
            const client = await clientRepository.findById(id)
            
            if (client) {
                await clientRepository.destroy(client)
                return httpResponse.ok(client,'Cliente removido')
            }

            return httpResponse.notFound('Cliente não encontrado')
            
        } catch (error) {
            return httpResponse.serverError()
        }
    }

    async update(request,response){
        const { id } = request.params
        const httpResponse = new HttpResponse(response)

        try {

            const client = await clientRepository.findById(id)

            if (client) {
                await clientRepository.update(client,request.body)
                return httpResponse.ok(client,'Cliente atualizado')
            }

            return httpResponse.notFound('Cliente não encontrado')
            
        } catch (error) {
            return httpResponse.serverError()
        }
    }
}