const { Email } = require('../database/models/email')

class EmailService {
  static async create(data) {
    const record = await this.find(data)

    if (record) {
      return record
    }

    const email = new Email(data)

    await email.save()

    return email
  }

  static async find(where) {
    return await Email.findOne(where)
  }
}

module.exports = { EmailService }
