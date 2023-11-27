import './Filter.css'

const Filter = ({filter, handleFilter}) => {
    return (
        <p className='filter'>
            filter shown with <input value={filter} onChange={handleFilter} />
        </p>
    )
}

export default Filter