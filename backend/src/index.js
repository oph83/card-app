const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

const Deck = require('./data/Deck')
const CardBack = require('./data/CardBack')

app.get('/', (request, response) => {
  response.send('<h1>Card app backend</h1>')
})

app.get('/api/deck', (request, response) => {
  response.json(Deck)
})

app.get('/api/back', (request, response) => {
  response.json(CardBack)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})