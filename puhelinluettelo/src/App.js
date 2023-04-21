import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonFrom from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialList => {
        setPersons(initialList)
      })
  }, [])

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilteredName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personToUpdateNumber = persons.find(person => person.name === newName)
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const replacedNumber = {...personToUpdateNumber, number: newNumber}
  
        personService
        .updateNumber(personToUpdateNumber.id, replacedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToUpdateNumber.id ? person : returnedPerson))
          setNotificationMessage(`${personToUpdateNumber.name}'s number has been changed`)
          setNotificationStyle('green')
          setTimeout(() => {
            setNotificationMessage('')
          }, 3000)
  
          setNewName('')
          setNewNumber('')
        })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      personService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNotificationMessage(`Added ${newPerson.name}`)
        setNotificationStyle('green')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
  
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data)
        setNotificationMessage(`Person validation failed: ${JSON.stringify(error.response.data)}`)
        setNotificationStyle('red')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
  
        setNewName('')
        setNewNumber('')
      })
    }
  }
  

  const deleteFromList = (id) => {
    const choosedPerson = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${choosedPerson.name} ?`)) {
      personService
      .deletePerson(choosedPerson.id)
      .then(() => {
        setNotificationMessage(`${choosedPerson.name}'s has been deleted`)
        setNotificationStyle('green')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setNotificationMessage(`Information of ${choosedPerson.name} has already been removed from server`)
        setNotificationStyle('red')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
      })
    }
  }
  
  const filteredPhoneBook = filteredName === ''
    ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle}/>
      <Filter filteredName={filteredName} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonFrom addPerson={addPerson} newName={newName} handleNewPerson={handleNewPerson}
                  newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons filteredPhoneBook={filteredPhoneBook}
               deletePerson={(id) => deleteFromList(id)}/>
    </div>
  )
}

export default App
