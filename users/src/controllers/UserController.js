const { UserService } = require('../services/UserService')
const { HttpStatus } = require('../enums/HttpStatus')

class UserController {
  static async index(request, response) {
    const users = await UserService.index()

    return response.status(HttpStatus.OK).json(users)
  }

  static async create(request, response) {
    const { body } = request

    const user = await UserService.create(body)

    return response.status(HttpStatus.CREATED).json(user)
  }
}

module.exports = { UserController }
