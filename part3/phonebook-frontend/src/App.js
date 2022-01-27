import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const NotifyTypes = {
  add: "add",
  replace: "replace",
  remove: "remove",
  error: "remove"

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)


    if (found && found.number === newNumber) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    if (found) {
      // eslint-disable-next-line no-restricted-globals
      const replace = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (!replace) {
        return
      }

      personService
      .update(found.id, {
        id: found.id, 
        name: found.name, 
        number: newNumber})
      .then(updated => {
        setPersons(persons.map((person) => {
          return person.id === found.id? updated : person
        }))
        setNotify({message: `Number Replaced: ${updated.name}`, type: NotifyTypes.replace})
        setTimeout(() => setNotify(null), 5000)
      })
      .catch((error) => {
        setNotify({message: error.response.data.error, type: NotifyTypes.error})
        setTimeout(() => setNotify(null), 5000)

      })

      return
    }

    personService
      .create({name: newName, number: newNumber})
      .then(person => {
        setPersons(persons.concat(person))
        setNotify({message: `Added: ${person.name}`, type: NotifyTypes.add})
        setTimeout(() => setNotify(null), 5000)
      })
      .catch((error) => {
        setNotify({message: error.response.data.error, type: NotifyTypes.error})
        setTimeout(() => setNotify(null), 5000)
      })

    setNewName('')
    setNewNumber('')
  }

  const handleInputChange = (event) => {
    if (event.target.name === "name") {
      setNewName(event.target.value)
    } else if (event.target.name === 'number') {
      setNewNumber(event.target.value)
    } else {
      setNewFilter(event.target.value)
    }
  }

  const removePerson = (event) => {
    const id = event.target.id
    // eslint-disable-next-line no-restricted-globals
    const remove = confirm(`Delete ${id}?`)

    if(!remove) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotify({message: `Removed: ${event.target.name}`, type: NotifyTypes.remove})
        setTimeout(() => setNotify(null), 5000)
      })
      .catch((error) => {
        setNotify({message: error.response.data.error, type: NotifyTypes.error})
        setTimeout(() => setNotify(null), 5000)
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notify={notify}/>
      <Filter fieldInfo={{name: 'search', value: newFilter}}
              onChange={handleInputChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit}
                  onChange={handleInputChange}
                  fieldsInfo={[
                    {name: 'name', value: newName},
                    {name: 'number', value: newNumber}
                  ]}
      />
      <h2>Numbers</h2>
      <Persons persons={persons}
               filter={newFilter}
               onClick={removePerson}/>
    </div>
  )
}

export default App
