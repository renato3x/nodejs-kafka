const { ServerError } = require('../errors/ServerError')
const { HttpStatus } = require('../enums/HttpStatus')

function ErrorHandler(error, request, response, next) {
  console.log(error)

  if (error instanceof ServerError) {
    return response.status(error.status).json({
      error: error.message
    })
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error'
  })
}

module.exports = { ErrorHandler }
