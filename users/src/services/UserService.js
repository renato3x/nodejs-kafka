const { User } = require('../database/schemas/User')

class UserService {
  static async index() {
    return await User.find()
  }

  static async create(data) {
    const user = new User(data)

    await user.save({ timestamps: true })

    return user
  }

  static async deleteById(id) {
    await User.findOneAndDelete({ _id: id })
  }
}

module.exports = { UserService }
