const express = require('express')
const nodemon = require('nodemon')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(morgan('tiny'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

function morganBody(req, res) {
    if (req.method === 'POST') {
      return JSON.stringify(req.body)
    }
    return ''
  }
  morgan.token('body', morganBody)

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    return maxId + Math.floor(Math.random() * (10000 - maxId + 1)) + maxId
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

    if (!body.name || persons.some(person => person.name === body.name) || !body.number) {
        return responce.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    responce.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })