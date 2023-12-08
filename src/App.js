import { useState, useEffect } from 'react'
import Filter from './components/Filter/Filter'
import PersonForm from './components/PersonForm/PersonForm'
import Persons from './components/Persons/Persons'
// import axios from 'axios'
import phonebook from './services/phonebook'

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

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} is already added to phoneboook`)
      } else {
        setPersons([...persons, {name: newName, phone: newPhone}]) // add new entry to phonebook
        phonebook.addEntry({name: newName, phone: newPhone}) // save new entry to backend
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
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App