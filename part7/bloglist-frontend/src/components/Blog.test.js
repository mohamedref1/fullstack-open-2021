import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let username
  let addLike
  let removeBlog

  beforeEach(() => {
    blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'blog-url.com',
      likes: 0,
      user: 'userId',
    }

    username = 'username'
    addLike = jest.fn()
    removeBlog = jest.fn()
  })

  test("only displays the blog's title and author by default", () => {
    const { container } = render(
      <Blog
        blog={blog}
        username={username}
        addLike={addLike}
        removeBlog={removeBlog}
      />
    )

    const element = container.querySelector('.blog')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(element).toContainHTML('<button>view</button>')
    expect(element).not.toHaveTextContent(`${blog.url}`)
    expect(element).not.toHaveTextContent(`likes: ${blog.likes}`)
    expect(element).not.toContainHTML('<button>remove</button>')
    expect(element).not.toContainHTML('<button>like</button>')
  })

  test("on view button clicked, displays the blog's url and likes", () => {
    const { container } = render(
      <Blog
        blog={blog}
        username={username}
        addLike={addLike}
        removeBlog={removeBlog}
      />
    )
    const element = container.querySelector('.blog')

    const viewBtn = screen.getByText('view')
    userEvent.click(viewBtn)

    expect(element).toHaveTextContent(`${blog.title}`)
    expect(element).toHaveTextContent(`${blog.author}`)
    expect(element).toHaveTextContent(`${blog.url}`)
    expect(element).toHaveTextContent(`likes: ${blog.likes}`)
    expect(element).toContainHTML('<button>hide</button>')
    expect(element).toContainHTML('<button>like</button>')
  })

  test('on like button clicked, number of likes increases', () => {
    render(
      <Blog
        blog={blog}
        username={username}
        addLike={addLike}
        removeBlog={removeBlog}
      />
    )

    const viewBtn = screen.getByText('view')
    userEvent.click(viewBtn)

    const likeBtn = screen.getByText('like')
    userEvent.click(likeBtn)
    userEvent.click(likeBtn)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
