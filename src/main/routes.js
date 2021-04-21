const cityRouter = require('./routes/city')
const clientRouter = require('./routes/client')

module.exports = app => {
    cityRouter(app)
    clientRouter(app)
  }