const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

beforeEach(async() => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('when there are initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')
    const usernames = response.body.map(({ username }) => username)
    expect(usernames).toContain(helper.initialUsers[0].username)
  })

  test('the returned users have id, but _id, __v and passwordHash', async () => {
    const response = await api.get('/api/users')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].__v).not.toBeDefined()
    expect(response.body[0].passwordHash).not.toBeDefined()
  })
})

describe('addition of new user', () => {
  test('succeeds with statuscode 201 if data is valid', async () => {
    const newUser = {
      username: 'newuser',
      name: 'new user',
      password: '123456m'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(({username}) => username)
    expect(usernames).toContain(newUser.username)
  })

  test('succeeds with statuscode 201 with no name if name is not given', async () => {
    const newUser = {
      username: 'newuser',
      password: '123456m'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(({username}) => username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with statuscode 400 if username is not given', async () => {
    const newUser = {
      name: 'new user',
      password: 'abc'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
  
  test('fails with statuscode 400 if username is already exist', async () => {
    const newUser = {
      username: helper.initialUsers[0].username,
      name: 'new user',
      password: 'abc'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

  })

  test('fails with statuscode 400 if username is less than 3 chars', async () => {
    const newUser = {
      username: 'ab',
      name: 'new user',
      password: 'abc'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

  })

  test('fails with statuscode 400 if password is not given', async () => {
    const newUser = {
      username: 'abc',
      name: 'new user'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('fails with statuscode 400 if password is less than 3 chars', async () => {
    const newUser = {
      username: 'abc',
      name: 'new user',
      password: 'ab'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})