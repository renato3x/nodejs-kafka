const chalk = require('chalk')

function log(prefix, ...message) {
  console.log(`${chalk.blue(`[${prefix}]`)}`, ...message)
}

module.exports = { log }
