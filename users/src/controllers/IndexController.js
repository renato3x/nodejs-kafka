const { HttpStatus } = require('../enums/HttpStatus')

class IndexController {
  static async index(request, response) {
    return response.status(HttpStatus.OK).json({ message: 'Hello World' })
  }
}

module.exports = { IndexController }
