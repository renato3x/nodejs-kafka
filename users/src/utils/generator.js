require('dotenv').config()

const { faker } = require('@faker-js/faker')
const axios = require('axios').default
faker.setLocale('pt_BR')

const generate = async(quantity) => {
  const loops = new Array(quantity).fill('')

  await Promise.all(loops.map(() => {
    return axios.post(process.env.USER_URL, {
      email: faker.internet.email(),
      username: faker.internet.userName()
    })
  }))
}

generate(20).catch(console.log)
