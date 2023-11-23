import { useState } from 'react'
const App = () => {

  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} is already added to phoneboook`)
      } else {
        setPersons([...persons, {name: newName}]) // add new name to phonebook
      }
    }
    setNewName('') // clear input field
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
     <h2>Phonebook</h2>
     <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} /> {/* controlled input */}
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
    
    <h2>Numbers</h2>
      {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </div>
  )
}

export default App