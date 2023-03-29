const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const config = require('../config/smtp-config.json')

class EmailSenderService {
  static async sendEmailVerification(username, email) {
    try {
      const html = fs.readFileSync(path.join(__dirname, '..', 'assets', 'email-template.html'), { encoding: 'utf-8' }).replace('$username', username)

      const transporter = nodemailer.createTransport(config)

      const info = await transporter.sendMail({
        from: `Suporte <${config.auth.user}>`,
        to: `${email}`,
        subject: 'Confirmação de email',
        html
      })

      return info
    } catch (error) {
      console.log('Erro ao enviar email', error)
    }
  }
}

module.exports = { EmailSenderService }
