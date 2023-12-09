import { useState, useEffect } from 'react'
import Filter from './components/Filter/Filter'
import PersonForm from './components/PersonForm/PersonForm'
import Persons from './components/Persons/Persons'
// import axios from 'axios'
import phonebook from './services/phonebook'
import Message from './components/Message/Message'

const App = () => {

  // const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '040-123456' },
  //                                         { name: 'Ada Lovelace', number: '39-44.5323523', id: 2},
  //                                         { name: 'Dan Abramov', number: '12-43-234345', id: 3},
  //                                         { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  //                                         ])
  // const baseURL = 'http://localhost:3001/persons'
  const [persons, setPersons] = useState([])
  useEffect( () => {
    phonebook.getAll()
          .then(data => setPersons(data))
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  // console.log(' message = ', message)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName) {
      const currentPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      // console.log('currentPerson = ', currentPerson)
      if (currentPerson) {
        if (window.confirm(`Update ${currentPerson.name}'s number?`) ) {
          const sameEntries = persons.filter(person => person.name.toLowerCase() !== newName.toLowerCase())
          console.log('sameEntries = ', sameEntries)
          phonebook.updateEntry(currentPerson.id, {name: currentPerson.name, number: newPhone})
          setPersons([...sameEntries, {...currentPerson, number: newPhone}])
          setMessage({text: `Updated ${newName}'s phone number`, warning: false}) // to display message
          setTimeout(() => { // to clear messge after 2500ms
            setMessage({})
          }, 2500);
        }
      } else {
        setPersons([...persons, {name: newName, number: newPhone}]) // add new entry to phonebook
        phonebook.addEntry({name: newName, number: newPhone}) // save new entry to backend
        setMessage({text: `Added ${newName}`, warning: false}) // to display message
        setTimeout(() => { // to clear messge after 2500ms
          setMessage({})
        }, 2500);
      }
    }

    setNewName('') // clear name input field
    setNewPhone('') // clear phone number input field
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    const name = person.name
    const id = person.id
    if (window.confirm(`Delete user ${name}?`)) {
      setPersons(persons.filter(person => person.id !== id))
      phonebook.deleteEntry(person.id)
    }
  }
  console.log(filter)

  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App