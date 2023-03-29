const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')

class EmailSenderService {
  static async sendEmailVerification(username, email) {
    try {
      const html = fs.readFileSync(path.join(__dirname, '..', 'assets', 'email-template.html'), { encoding: 'utf-8' }).replace('$username', username)

      const account = await nodemailer.createTestAccount()

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      const info = await transporter.sendMail({
        from: `Suporte <${account.user}>`,
        to: `${email}, ${email}`,
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
