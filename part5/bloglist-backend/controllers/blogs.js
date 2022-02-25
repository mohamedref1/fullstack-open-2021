const exceptions = require('../utils/exceptions')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {blogs: 0})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user


  if (!user) {
    throw exceptions.JsonWebTokenError()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  // await user.save()
  await User.findByIdAndUpdate(user._id, user)

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const toUpdate = request.body
  const user = request.user
  const blog = await Blog.findById(id)

  if (!user) {
    throw exceptions.JsonWebTokenError()
  }

  if (!user._id.toString() === blog.user.toString()) {
    throw exceptions.UnauthorizedOperation()
  }


  const updatedBlog = await Blog
    .findByIdAndUpdate(id, toUpdate, {new: true, runValidators: true})

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(204).end()
  }

  if (!user) {
    throw exceptions.JsonWebTokenError()
  }

  if (!user._id.toString() === blog.user.toString()) {
    throw exceptions.UnauthorizedOperation()
  }

  await Blog.findByIdAndRemove(id)
  user.blogs = user.blogs.filter((blog) => blog.id !== id)
  // await user.save()
  await User.findByIdAndUpdate(user._id, user)

  response.status(204).end()
})

module.exports = blogsRouter