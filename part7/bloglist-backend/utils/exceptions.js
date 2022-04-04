const JsonWebTokenError = (message) => {
  return CustomError('JsonWebTokenError', message)
}

const UnauthorizedOperation = (message) => {
  return CustomError('UnauthorizedOperation', message)
}

const InvalidPassword = (message) => {
  return CustomError('InvalidPassword', message)
}

const CustomError = (name, message) => {
  const error = new Error(message)
  error.name = name
  return error
}

module.exports = {
  JsonWebTokenError,
  UnauthorizedOperation,
  InvalidPassword
}