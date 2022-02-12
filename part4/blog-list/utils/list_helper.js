const _ = require('lodash')

/**
 * 
 * @returns 1
 */
const dummy = () => {
  return 1
}

/**
 * Sum likes of the given blogs
 * @param {blogs} blogs list of blogs 
 * @returns the sum of blogs likes
 */
const totalLikes = (blogs) => {
  return _.reduce(blogs, (total, {likes}) => total + likes, 0)
}

/**
 * Get the most liked blog of the given blogs
 * @param {blogs} blogs list of blogs 
 * @returns the most liked blog
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  
  const result = _.reduce(blogs, (prev, curr) => curr.likes >= prev.likes ? curr : prev)
  return {title: result.title, author: result.author, likes: result.likes}
}

/**
 * Get the most blogged author
 * @param {blogs} blogs list of blogs 
 * @returns an object of the author name that has the largest amount of blogs and the number of blogs he has
 */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = _.map(blogs, ({author}) => author)
  const uniqueAuthors = _.uniq(authors)
  const authorsWithBlogs = _.map(uniqueAuthors, (author) => ({
    author,
    blogs: _.countBy(blogs, {author}).true
  }))
  
  return _.reduce(authorsWithBlogs, (prev, curr) => curr.blogs >= prev.blogs ? curr : prev)
}

/**
 * Get the most liked author
 * @param {blogs} blogs list of blogs 
 * @returns an object of the author name and his all likes
 */
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = _.map(blogs, ({author}) => author)
  const uniqueAuthors = _.uniq( authors )
  const authorsWithLikes = _.map(uniqueAuthors, (author) => {
    const authorBlogs = _.filter(blogs, (blog) => blog.author === author) 
    const totalLikes = authorBlogs.length === 1
      ? authorBlogs[0].likes
      : _.reduce(authorBlogs, (prev, curr) => prev.likes + curr.likes)

    return {
      author,
      likes: totalLikes
    }
  })

  return authorsWithLikes.reduce((prev, curr) => curr.likes >= prev.likes ? curr : prev)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}