class ServerError extends Error {
  status = 0

  constructor(status, message) {
    super(message)
    this.status = status
  }
}

module.exports = { ServerError }
