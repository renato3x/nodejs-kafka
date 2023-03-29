const { UserService } = require('../services/UserService')
const { HttpStatus } = require('../enums/HttpStatus')
const { producer } = require('../messaging/kafka/producer')

class UserController {
  static async index(request, response) {
    const users = await UserService.index()

    return response.status(HttpStatus.OK).json(users)
  }

  static async create(request, response) {
    const { body } = request

    const user = await UserService.create(body)

    await producer.send({
      topic: 'user.new',
      messages: [
        {
          value: JSON.stringify({ email: user.email, username: user.username })
        }
      ]
    })

    return response.status(HttpStatus.CREATED).json(user)
  }

  static async deleteById(request, response) {
    const { id } = request.params

    await UserService.deleteById(id)

    return response.status(HttpStatus.OK).json({ ok: true })
  }
}

module.exports = { UserController }
