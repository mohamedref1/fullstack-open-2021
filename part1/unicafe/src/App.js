import React, {useState} from 'react'


const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticsLine = ({text, stats}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{stats}{text==='positive'? '%': ''}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    if (good || neutral || bad) {
        return (
            <div>
                <h2>statistics</h2>
                <table>
                    <tbody>
                        <StatisticsLine text='good' stats={good} />
                        <StatisticsLine text='neutral' stats={neutral} />
                        <StatisticsLine text='bad' stats={bad} />
                        <StatisticsLine text='all' stats={all} />
                        <StatisticsLine text='average' stats={average} />
                        <StatisticsLine text='positive' stats={positive} />
                    </tbody>
                </table>
           </div>
        )
    } else {
        return (
            <div>
                <h2>statistics</h2>
                <p>No feedback given</p>
           </div>
        )        
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad
    const average = good || bad? (good - bad) / (good + neutral + bad): 0
    const positive = good? good / (good + neutral + bad) * 100: 0


    const increaseGood = () => setGood(good + 1)
    const increaseNeutral = () => setNeutral(neutral + 1)
    const increaseBad = () => setBad(bad + 1)

    return (
        <div>
            <div>
                <h2>give feedback</h2>
                <Button onClick={increaseGood} text='good' />
                <Button onClick={increaseNeutral} text='neutral' />
                <Button onClick={increaseBad} text='bad' />
            </div>
            <Statistics good={good} 
                        neutral={neutral} 
                        bad={bad}
                        all={all}
                        average={average}
                        positive={positive} />
        </div>
    )
}

export default App