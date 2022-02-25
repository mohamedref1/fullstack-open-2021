const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  await new User(helper.initialUsers[0]).save()

  token = await helper.getToken(helper.initialUsers[0].username, 'secret')
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((blog) => blog.title)
    expect(titles).toContain('Canonical string reduction')
  })

  test('the returned blogs have id property, but _id and __v', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].__v).not.toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with statuscode 200 if token and data is valid', async () => {
    const newBlog = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
      likes: 9,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
    
    const savedBlog = response.body
    newBlog.id = savedBlog.id
    newBlog.user = savedBlog.user
    expect(savedBlog).toEqual(newBlog)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('succeeds with 0 likes if likes is not provided', async () => {
    const newBlog = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
    
    const savedBlog = response.body
    newBlog.id = savedBlog.id
    newBlog.likes = savedBlog.likes
    newBlog.user = savedBlog.user
    expect(savedBlog.likes).toBe(0)
    expect(savedBlog).toEqual(newBlog)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('fails with statuscode 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
        
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('fails with statuscode 401 if token is not valid', async () => {
    const newBlog = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token.slice(0, token.length - 1)}`)
      .send(newBlog)
      .expect(401)
        
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('fails with statuscode 400 if title or url is not provided', async () => {
    const newBlog = {
      author: 'Reid Holmes',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
        
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
})

describe('deletion of a blog', () => {
  test('succeeds with statuscode 204 if token and id is valid', async () => {
    const blogId = (await helper.blogsInDb())[0].id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('succeeds with statuscode 204 if token is valid and id is not exist', async () => {
    const nonExistId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${nonExistId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('fails with statuscode 401 if token is not provided', async () => {
    const blogId = (await helper.blogsInDb())[0].id

    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with statuscode 401 if token is invalid', async () => {
    const blogId = (await helper.blogsInDb())[0].id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `bearer ${token.slice(0, token.length - 1)}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'invalid id'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update of a blog', () => {
  test('succeeds with statuscode 200 if token and id is valid', async () => {
    const blog = (await helper.blogsInDb())[0]
    const toUpdate = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
      likes: 20
    }

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(toUpdate)
      .expect(200)

    expect(response.body).toEqual({...blog, ...toUpdate})
  })

  test('fails with statuscode 401 if token is not provided', async () => {
    const blog = (await helper.blogsInDb())[0]
    const toUpdate = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
      likes: 20
    }

    response = await api
      .put(`/api/blogs/${blog.id}`)
      .send(toUpdate)
      .expect(401)

  })

  test('fails with statuscode 401 if token is invalid', async () => {
    const blog = (await helper.blogsInDb())[0]
    const toUpdate = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
      likes: 20
    }

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', `bearer ${token.slice(0, token.length - 1)}`)
      .send(toUpdate)
      .expect(401)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'invalid id'
    const toUpdate = {
      title: 'Software Engineering: Introduction',
      author: 'Reid Holmes',
      url: 'https://ubcx.com/',
  
    }
    
    await api
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .send(toUpdate)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})