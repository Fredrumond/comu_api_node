module.exports = class CityController {
    async create(request,response){
        const { nome, estado } = request.body
        try {
            if(!nome){
                return response.status(400).json({message: 'O nome é obrigatório' })
            }
    
            if(!estado){
                return response.status(400).json({message: 'O estado é obrigatório' })
            }
        } catch (error) {
            return response.status(500).json({message: '500' })
        }
        
    }
}