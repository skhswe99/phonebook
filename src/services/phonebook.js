import axios from "axios"

const baseURL = 'http://localhost:3001/persons'
const getAll = () => {
    return axios.get(`${baseURL}`)
    .then(res => {
    //   console.log(res.data)
      return res.data
    })
}

export default { getAll }