const CityController = require("../../controllers/CityController")

const cityController = new CityController()
module.exports = app => {
    app.post('/cidade', cityController.create);
  };