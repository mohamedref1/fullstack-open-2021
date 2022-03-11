import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return filter !== '' 
            ? anecdotes.filter(({content}) => content.includes(filter)) 
            : anecdotes.concat()
    })

    const dispatch = useDispatch()

    const increaseVotes = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`you voted "${anecdote.content}" anecdote `, 5))
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => (b.votes - a.votes))
                .map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => increaseVotes(anecdote)}>vote</button>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default AnecdoteList