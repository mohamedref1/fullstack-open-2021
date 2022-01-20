import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectAnecdoteRandomly = () => {
    const getRandInteger = (min, max) =>
        Math.floor(Math.random() * (max - min)) + min
    
    const max = anecdotes.length
    const current = selected

    let another = getRandInteger(0, max)
    while (current === another) {
        another = getRandInteger(0, max)
    }

    setSelected(another)
  }

  const increaseAnecdoteVote = () => {
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    setVotes(copy)
  }

  const getMostVotedAnecdoteIndex = () => 
    // Return the highest vote Index
    votes.indexOf(
        // Get the highest vote
        votes.reduce( (prev, curr) => curr > prev ? curr : prev ))
  
  const mostVoteAnecdoteIndex = getMostVotedAnecdoteIndex();

  return (
    <div>
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]} has {votes[selected]} votes</p>
            <button onClick={increaseAnecdoteVote}>vote</button>
            <button onClick={selectAnecdoteRandomly}>next anecdote</button>
        </div>
        <div>
            <h2>Ancdote with the most vote</h2>
            <p>{anecdotes[mostVoteAnecdoteIndex]} has {votes[mostVoteAnecdoteIndex]} votes</p>
        </div>
    </div>
  )
}

export default App
