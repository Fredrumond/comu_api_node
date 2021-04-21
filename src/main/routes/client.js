const ClientController = require("../../controllers/ClientController")

const clientController = new ClientController()
module.exports = app => {
    app.post('/cliente', clientController.create)
    app.get('/cliente', clientController.show)
  };