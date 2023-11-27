import { useState } from 'react'
const App = () => {

  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '040-123456' },
                                          { name: 'Ada Lovelace', number: '39-44.5323523', id: 2},
                                          { name: 'Dan Abramov', number: '12-43-234345', id: 3},
                                          { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
                                          ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

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

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  console.log(filter)

  return (
    <div>
     <h2>Phonebook</h2>
     filter shown with <input value={filter} onChange={handleFilter} />
     <form onSubmit={handleSubmit}>
      add a new
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
      <h3>found numbers</h3>
      {/* use regex to test for alphabetical name search */}
      {persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 && /^[1-zA-Z]+$/.test(filter)).map(person => <li key={person.name}>{person.name} {person.phone}</li>)}
            
      <h3>all names</h3>
      {persons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)}
    </div>
  )
}

export default App