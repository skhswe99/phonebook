import axios from "axios"

// const baseURL = 'http://localhost:3001/api/persons'
const baseURL = '/api/persons' // when frontend and backend are at same address, i.e. a build of frontend is copies to backend
const getAll = () => {
    return axios.get(baseURL)
    .then(res => {
    //   console.log(res.data)
      return res.data
    })
}

const addEntry = (entry) => {
  axios.post(baseURL, entry)
        // .then(res => {
        //   console.log(res.data)
        // })
}

const deleteEntry = (id) => {
  axios.delete(`${baseURL}/${id}`)
      // .then(res => {
      //   console.log(res.data)
      // })
}

const updateEntry = (id, data) => {
  return axios.put(`${baseURL}/${id}`, data)
        // .then(res => {
        //   console.log(res.data)
        // })
        .catch(err => {
          return err
        })
}

export default { getAll, addEntry, deleteEntry, updateEntry }