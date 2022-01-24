import React from 'react'

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map( part => 
                <Part key={part.id}
                        name={part.name}
                        exercises={part.exercises} 
                />
                
            )}
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = ({parts}) => {
    const exercisesCount = parts.reduce((acc, {exercises}) => acc + exercises, 0)
    
    return (
        <p>
            <b>total of {exercisesCount} exercises</b>
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

export default Course