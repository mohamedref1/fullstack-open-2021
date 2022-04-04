const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

// All created by initialUsers[0]._id
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '62055b289c95b1c856a38915',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '62055b289c95b1c856a38915',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '62055b289c95b1c856a38915',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '62055b289c95b1c856a38915',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '62055b289c95b1c856a38915',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: '62055b289c95b1c856a38915',
    likes: 2,
    __v: 0
  }  
]

// the initailUsers[0] creates all initialBlogs
// passwordHash = await bcrypt.hash('secret', 10) 
const initialUsers = [
  {
    _id: '62055b289c95b1c856a38915',
    username: 'userone',
    name: 'user two',
    passwordHash: '$2b$10$aL/jr/flCir0jPxuQqZMqOJq/egdBRRWxJAA4SZPW2xvxPLF7AGIK',
    blogs: initialBlogs.map(({user}) => user),
    __v: 0
  },
  {
    _id: '62055b289c95b1c856a38914',
    username: 'usertwo',
    name: 'user two',
    passwordHash: '$2b$10$aL/jr/flCir0jPxuQqZMqOJq/egdBRRWxJAA4SZPW2xvxPLF7AGIK',
    blogs: [],
    __v: 0
  },
  {
    _id: '62055b289c95b1c856a38913',
    username: 'userthree',
    name: 'user one',
    passwordHash: '$2b$10$aL/jr/flCir0jPxuQqZMqOJq/egdBRRWxJAA4SZPW2xvxPLF7AGIK',
    blogs: [],
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => JSON.parse(JSON.stringify(blog)))
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => JSON.parse(JSON.stringify(user)))
}

const nonExistingId = async () => {
  const savedBlog = await new Blog({
    title: 'temp',
    author: 'temp',
    url: 'https://temp.com/',
    likes: 0,
  }).save()

  await Blog.findByIdAndRemove(savedBlog._id)

  return savedBlog._id.toString()
}

const getToken = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({
      username,
      password
    })
    .expect(200)

  return response.body.token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,

  initialUsers,
  usersInDb,

  getToken
}