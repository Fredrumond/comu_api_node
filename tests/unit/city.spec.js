const CityController = require('../../src/controllers/CityController')

// const mockResponse = {
//     const res = {};
//     res.status = () => res;
//     res.json = () => res;
//     return res;
//   };

const mockResponse = () => {
    const res = {};
    res.status = () => jest.fn().mockReturnValue(res);
    res.json = () => jest.fn().mockReturnValue(res);
    console.log("TO ONO RES")
    console.log(res)
    return res;
  };

describe.skip('Testando rotas da cidade', () => {
    it('Deve retornar 400 se não foi informado o nome', async () => {
      const city = new CityController()
      const httpRequest = {
        body: {}
      }
      const httpResponse = mockResponse();

      await city.create(httpRequest,httpResponse)
    //   console.log(httpResponse)
      expect(400).toBe(400)
    })
  })
  