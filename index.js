const express = require('express')
const nodemon = require('nodemon')
const app = express()
app.use(express.json())


const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    return maxId + 1
}

const generateNumber = () => {
    return Math.floor(Math.random() * (39999999 - 39000000 + 1)) + 39000000;
}

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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  app.post('/api/persons', (request, responce) => {
    const body = request.body

    if (!body.name || persons.some(person => person.name === body.name)) {
        return responce.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: generateNumber()
    }

    persons = persons.concat(person)
    responce.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})