import axios from 'axios'
const baseUrl = '/api'

const getDeck = async () => {
  const response = await axios.get(`${baseUrl}/deck`)
  return response.data
}

const getCardBack = async () => {
  const response = await axios.get(`${baseUrl}/back`)
  return response.data
}

export default { getDeck, getCardBack }