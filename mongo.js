const mongoose = require('mongoose')

if (process.env.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://elmoerla:${password}@cluster0.wpd0h1f.mongodb.net/PhoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Number = mongoose.model('Number', noteSchema)

if (process.argv.length === 3) {
    Number.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(number => {
            console.log(number.name, number.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const number = new Number({
        name: process.argv[3],
        number: process.argv[4],
    })
    number.save().then(result => {
        console.log('Added', result.name, result.number, 'to phonebook')
        mongoose.connection.close()
    })
}
