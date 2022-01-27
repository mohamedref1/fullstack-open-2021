const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log({error: "use the follwoing schema only: node mongo <password> [<name> <number>]?"})
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@full-stack.25ioe.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(() => console.log('Connected to the database successfully'))
    .catch((error) => {
        console.log('Failed to connect to the database.', error)
        process.exit(1)
    })


const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('person', personSchema)


if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(savedPerson => {
        console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
        process.exit(1)
    })
}