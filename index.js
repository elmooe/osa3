const express = require('express')
const nodemon = require('nodemon')
const app = express()

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5325323"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "39-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/info', (request, responce) => {
    responce.send(`<p>Phonebook has info for ${persons.length} people</br>
    ${Date().toString()}</p>`)
})

app.get('/api/persons', (request, responce) => {
  responce.json(persons)
})

app.get('/api/persons/:id', (request, responce) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        responce.json(person)
    } else {
        responce.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})