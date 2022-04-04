import React from "react"
import { useField, useReset } from '../hooks/index'
import { useNavigate } from "react-router-dom"

const CreateForm = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const reset = useReset([
      content.reset, 
      author.reset, 
      info.reset
    ])
    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.attributes.value,
        author: author.attributes.value,
        info: info.attributes.value,
        votes: 0
      })
      navigate('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.attributes} />
          </div>
          <div>
            author
            <input {...author.attributes} />
          </div>
          <div>
            url for more info
            <input {...info.attributes} />
          </div>
          <button>create</button>
          <button type="reset" onClick={() => reset()}>reset</button>
        </form>
      </div>
    )
  
}
 
export default CreateForm