const listHelper = require('../utils/list_helper')

let blogs =  []

beforeEach(() => {
  blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }  
  ]
})

test('dummy returns one', () => {
  const blog = []

  const result = listHelper.dummy(blog)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of emtpy list is zero', () => {
    const bloglist = []

    const result = listHelper.totalLikes(bloglist)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const bloglist = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(bloglist)
    expect(result).toBe(5)
  })

  test('of a blogger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)

  })
})

describe('most likes', () => {
  test('of emtpy list is {}', () => {
    const bloglist = []

    const result = listHelper.favoriteBlog(bloglist)  

    expect(result).toEqual({})
  })

  test('when list has only one blog equals this blog', () => {
    const bloglist = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,

    }

    const result = listHelper.favoriteBlog(bloglist)
    expect(result).toEqual(expected)
  })

  test('of a blogger list is equals the most liked one', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,

    }


    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(expected)

  })
})

describe('most blogging author', () => {
  test('of emtpy list is {}', () => {
    const bloglist = []

    const result = listHelper.mostBlogs(bloglist)  

    expect(result).toEqual({})
  })

  test('when list has only one author equals this author', () => {
    const bloglist = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }

    const result = listHelper.mostBlogs(bloglist)
    expect(result).toEqual(expected)
  })

  test('of a blogger list is equals the most blogged author', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,

    }


    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expected)

  })
})

describe('most liked author', () => {
  test('of emtpy list is {}', () => {
    const bloglist = []

    const result = listHelper.mostLikes(bloglist)  

    expect(result).toEqual({})
  })

  test('when list has only one author equals this author likes', () => {
    const bloglist = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5,

    }

    const result = listHelper.mostLikes(bloglist)
    expect(result).toEqual(expected)
  })

  test('of a blogger list is equals the most liked author', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,

    }


    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(expected)

  })
})