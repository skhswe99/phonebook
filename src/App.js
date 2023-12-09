import { useState, useEffect } from 'react'
import Filter from './components/Filter/Filter'
import PersonForm from './components/PersonForm/PersonForm'
import Persons from './components/Persons/Persons'
import phonebook from './services/phonebook'
import Message from './components/Message/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect( () => {
    phonebook.getAll()
          .then(data => setPersons(data))
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()

    if (newName) {
      const currentPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

      if (currentPerson) { // existing entry in phonebook
        if (window.confirm(`Update ${currentPerson.name}'s number?`) ) {
          const sameEntries = persons.filter(person => person.name.toLowerCase() !== newName.toLowerCase())
          const errMsg = phonebook.updateEntry(currentPerson.id, {name: currentPerson.name, number: newPhone})
    
          if (errMsg) {
            console.log('errMsg in handleSubmit = ', errMsg)
            setPersons([...sameEntries])
            setMessage({text: `${currentPerson.name}'s has already been removed!`, warning: true}) // to display error message
            setTimeout(() => { // to clear messge after 2500ms
              setMessage({})
            }, 2500);
          } else {
            setPersons([...sameEntries, {...currentPerson, number: newPhone}])
            setMessage({text: `Updated ${newName}'s phone number`, warning: false}) // to display success message
            setTimeout(() => { // to clear messge after 2500ms
              setMessage({})
            }, 2500);
          }  
        }        
      } else { // new entry to be added
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