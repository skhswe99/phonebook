import axios from "axios"

const baseURL = 'http://localhost:3001/persons'
const getAll = () => {
    return axios.get(baseURL)
    .then(res => {
    //   console.log(res.data)
      return res.data
    })
}

const addEntry = (entry) => {
  axios.post(baseURL, entry)
        .then(res => {
          console.log(res.data)
        })
}

const deleteEntry = (id) => {
  
  axios.delete(`${baseURL}/${id}`)
      .then(res => {
        console.log(res.data)
      })
}

const updateEntry = (id, data) => {
  axios.put(`${baseURL}/${id}`, data)
        .then(res => {
          console.log(res.data)
        })
}

export default { getAll, addEntry, deleteEntry, updateEntry }