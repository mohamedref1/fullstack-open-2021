require('dotenv').config()

const Person = require('./models/person')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// Helper Functions

const generateId = () => {
	const min = 1
	const max = 10000
	return Math.floor( Math.random() * (max - min + 1) + min ) 
}

morgan.token('body', (request, response) => {
	return JSON.stringify(request.body)
})

const customLogger = ':method :url :status :res[content-length] - :response-time ms :body'

// Middlewires

app.use(cors())

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(customLogger))

// Routers

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/info', (request, response) => {
	Person.find({}).then(persons => {
		const numOfPeople = persons.length
		const now = new Date()
		response.send(`<h2>Phonebook has info for ${numOfPeople} people</h2>
					   <p>${now}</p>`)
	})

	
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id

	Person.findById(id)
	.then(person => {
		if(!person) {
			return response.status(404).send({ error: 'not found' })
		}

		response.json(person)
		})
	.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({ error: "both person name and person number should be provided" })
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})
	
	person
	.save()
	.then(savedPerson => {
		response.json(savedPerson)
	 })
	.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const body = request.body

	if(!body) {
		return response.status(400).send({ error: 'the new name should be provided'})
	}

	Person
	.findByIdAndUpdate(id, {number: body.number }, { new: true, runValidators: true })
	.then(updatedPerson =>{
		response.json(updatedPerson)
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id

	Person.findByIdAndRemove(id).then(() => {
		response.end()
	})
})

// Handlers

const notFound = (request, response) => {
	response.status(404).send({ error: 'not found' })
}

app.use(notFound)

const errorHandler = (error, request, response, next) => {
	console.log(error)

	if (error.name === 'CastError') {
		return response.status(400).json({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

// RUN

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('server is running at ', PORT))