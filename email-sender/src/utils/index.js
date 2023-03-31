const chalk = require('chalk')

function log(context, ...message) {
  const types = {
    info: {
      prefix: 'INFO',
      color: 'blue'
    },
    warn: {
      prefix: 'WARN',
      color: 'yellow'
    },
    error: {
      prefix: 'ERROR',
      color: 'red'
    }
  }

  const type = types[context.toLowerCase()]
  const color = chalk[type.color]
  const date = new Date()

  console.log(`${color(`[${type.prefix}]`)}`, `${chalk.green(`[${date.toLocaleTimeString()}]`)}`, ...message)
}

module.exports = { log }
