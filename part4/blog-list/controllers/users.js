const bcrypt = require('bcrypt')
const exceptions = require('../utils/exceptions')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {user: 0})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined || body.password.length < 3) {
    throw exceptions.InvalidPassword()
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(body.password, salt)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: []
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter