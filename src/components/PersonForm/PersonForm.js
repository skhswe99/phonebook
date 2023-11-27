import './PersonForm.css'

const PersonForm = ({handleSubmit, newName, handleNewName, newPhone, handleNewPhone}) => {
    return(
        <form onSubmit={handleSubmit} className='form'>
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
    )
}

export default PersonForm