const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({username: body.username})

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({'error': 'invalid username or password'})
  }

  tokenForUser = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(tokenForUser, config.SECRET, {expiresIn: 60 * 60 * 24})
  
  response.status(200).json({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter