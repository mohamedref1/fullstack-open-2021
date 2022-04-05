const path = require('path')
const logger = require('./logger')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, config.SECRET)

    if (decodedToken.id) {
      request.user = await User.findById(decodedToken.id)
    }
  }

  next()
}

const routeHandler = (request, response, next) => {
  response.sendFile(
    path.join(__dirname, '../build/index.html'),
    function (err) {
      if (err) {
        next(err)
      }
    }
  )
}

const unknwonEndPoint = (request, response) => {
  response.status(404).json('unknown endpoint')
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json(error.message)
  } else if (error.name === 'InvalidPassword') {
    return response.status(400).json({ error: 'invalid password' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid or missing token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.name === 'UnauthorizedOperation') {
    return response.status(401).json({ error: 'unauthorized operation' })
  }

  next()
}

module.exports = {
  requestLogger,
  userExtractor,
  routeHandler,
  unknwonEndPoint,
  errorHandler,
}
