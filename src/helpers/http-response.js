module.exports = class HttpResponse {
  constructor (response) {
    this.response = response
  }
  ok (body, message) {
    return this.response.status(200).json({body,message})
  }

  created (body, message) {
    return this.response.status(201).json({body,message})
  }

  badRequest (message) {
    return this.response.status(400).json({message})
  }

  notFound (message) {
    return this.response.status(404).json({message})
  }

  serverError (message = null) {
    let defaultMessage = 'Algo inesperado aconteceu, tente novamente'
    if(message != null){}
      defaultMessage = message
      
    return this.response.status(500).json({message: defaultMessage})
  }
}
