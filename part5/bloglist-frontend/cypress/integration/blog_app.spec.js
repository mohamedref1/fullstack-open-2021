/* eslint-disable for-direction */
describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.register({ username: 'JoneDoe', name: 'Jone Doe', password: '123456a' })
    cy.register({ username: 'JaneDoe', name: 'Jane Doe', password: '123456a' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('JoneDoe')
        .get('input[name="password"]').type('123456a')
        .get('button[type="submit"]').click()

      cy.contains('Jone Doe logged-in successfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('JoneDoe')
        .get('input[name="password"]').type('123456x')
        .get('button[type="submit"]').click()

      cy.contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'JoneDoe', password: '123456a' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
          .get('input[name="title"]').type('This is the blog title')
          .get('input[name="author"]').type('the blog author')
          .get('input[name="url"]').type('blogUrl.com')

        cy.get('button[type="submit"]')
          .contains('create')
          .click()

        cy.contains('This is the blog title the blog author')
          .contains('view')
      })

      describe('When there are at least one blog', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'This is the first blog title',
            author: 'the first blog author',
            url: 'firstBlogUrl.com'
          })

          cy.createBlog({
            title: 'This is the second blog title',
            author: 'the second blog author',
            url: 'secondBlogUrl.com'
          })

          cy.createBlog({
            title: 'This is the third blog title',
            author: 'the third blog author',
            url: 'thirdBlogUrl.com'
          })
        })

        it('can add like to a blog', function () {
          cy.get('.blog')
            .contains('This is the first blog title')
            .as('myBlog')
            .contains('view').click()

          cy.get('@myBlog')
            .get('button')
            .contains('like')
            .click()

          cy.get('@myBlog')
            .contains('likes: 1')
        })

        it('only blog owner can remove the blog', function () {
          // with a blog non-owner user
          cy.contains('logout').click()
          cy.get('input[name="username"]').type('JaneDoe')
            .get('input[name="password"]').type('123456a')
            .get('button[type="submit"]').click()

          cy.get('.blog')
            .contains('This is the first blog title')
            .as('myBlog')
            .contains('view').click()

          cy.get('@myBlog')
            .not('#blog-rm')

          // with a blog owner user
          cy.contains('logout').click()
          cy.get('input[name="username"]').type('JoneDoe')
            .get('input[name="password"]').type('123456a')
            .get('button[type="submit"]').click()

          cy.get('@myBlog').contains('view').click()
            .reload()
            .get('@myBlog').contains('view').click()
            .get('@myBlog').get('#blog-rm').click()
        })

        it('blogs are displayed in order, depending on likes', function () {
          // third to first
          cy.contains('This is the third blog title the third blog author')
            .as('third')
            .contains('view')
            .click()

          cy.get('@third')
            .get('button')
            .contains('like')
            .click().wait(100)
            .click().wait(100)
            .click()

          // first to second
          cy.contains('This is the first blog title the first blog author')
            .as('first')
            .contains('view')
            .click()

          cy.get('@first')
            .contains('like')
            .click().wait(100)
            .click()

          cy.get('.blog')
            .then((blogs) => {
              cy.wrap(blogs[0])
                .contains('This is the third blog title')

              cy.wrap(blogs[1])
                .contains('This is the first blog title')

              cy.wrap(blogs[2])
                .contains('This is the second blog title')
            })
        })
      })
    })
  })
})