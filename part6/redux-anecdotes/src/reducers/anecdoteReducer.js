import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'SET':
      const anecdotes = action.data
      return anecdotes

    case 'APPEND': 
      const anecdote = action.data
      return [...state, anecdote]

    case 'VOTE':
      const id = action.data
      return state.map((anecdote) => (
        anecdote.id === id 
          ? {...anecdote, votes: anecdote.votes + 1} 
          : anecdote
        )
      )

    default: 
      return state
  }
}

const set = (anecdotes) => {
  return {
    type: 'SET',
    data: anecdotes
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

const append = (anecdote) => {
  return {
    type: 'APPEND',
    data: anecdote
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(append(anecdote))
  }
}

const vote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(vote(newAnecdote.id))
  }
}

export default reducer