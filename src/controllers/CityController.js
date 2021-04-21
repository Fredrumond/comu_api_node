module.exports = class CityController {
    async create(request,response){
        const { nome } = request.body
        try {
            if(!nome){
                return response.status(400).json({message: '400' })
            }
        } catch (error) {
            return response.status(500).json({message: '500' })
        }
        
    }
}