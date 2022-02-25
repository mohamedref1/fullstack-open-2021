import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()
  })

  test('displays title, author and url fields', () => {
    const { container } = render(
      <BlogForm
        createBlog={createBlog}
      />
    )

    const title = container.querySelector('input[name="title"]')
    const author = container.querySelector('input[name="author"]')
    const url = container.querySelector('input[name="url"]')
    const create = container.querySelector('button[type="submit"]')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(create).toBeDefined()
  })

  test('onSubmit, calls the createBlog with the right params', () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'blog-url.com',
    }

    const { container } = render(
      <BlogForm
        createBlog={createBlog}
      />
    )

    const title = container.querySelector('input[name="title"]')
    userEvent.type(title, blog.title)

    const author = container.querySelector('input[name="author"]')
    userEvent.type(author, blog.author)

    const url = container.querySelector('input[name="url"]')
    userEvent.type(url, blog.url)

    const create = screen.getByText('create')
    userEvent.click(create)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(blog)
  })
})