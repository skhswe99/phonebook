import { useState } from 'react'
const App = () => {

  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '040-123456' }])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} is already added to phoneboook`)
      } else {
        setPersons([...persons, {name: newName, phone: newPhone}]) // add new name to phonebook
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

  return (
    <div>
     <h2>Phonebook</h2>
     <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} /> {/* controlled input */}
      </div>
      <div>
        number: <input value={newPhone} onChange={handleNewPhone} />
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
    
    <h2>Numbers</h2>
      {persons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)}
    </div>
  )
}

export default App