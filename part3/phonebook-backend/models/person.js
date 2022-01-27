const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)
mongoose.connect(url)
    .then(() => {
        console.log('connected to the database')
    })

const numberValidator = (number) => {
    if(number.length === 8) {
        return !Number.isNaN(Number(number)) && number[0] !== '-'
    } else if (number[2] === '-') {
        return !Number.isNaN(Number(number.slice(0,2))) &&
               !Number.isNaN(Number(number.slice(3,number.length))) &&
               number[0] !== '-'
    } else if (number[3] === '-') {
        return !Number.isNaN(Number(number.slice(0,3))) &&
               !Number.isNaN(Number(number.slice(4,number.length))) &&
               number[0] !== '-'
    } else {
        return false
    }
}

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        maxLength: 9,
        required: true,
        validate: {
            validator: numberValidator,
            message: props => `${props.value} is not a valid number`
        }

    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('person', personSchema)