const ClientController = require("../../controllers/ClientController")

const clientController = new ClientController()
module.exports = app => {
    app.post('/cliente', clientController.create)
    app.get('/cliente', clientController.show)
    app.get('/cliente/:id', clientController.show)
    app.delete('/cliente/:id', clientController.delete)
    app.patch('/cliente/:id', clientController.update)
  };