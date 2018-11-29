const mongoose = require('mongoose')
const connectionString = 'mongodb:student:student1@ds038888.mlab.com:38888/products'
const connection = mongoose.connection

mongoose.connect(connectionString, { useNewUrlParser: true })

connection.on('error', err => {
  console.log('Error from the database: ', err)
})

connection.once('open', () => {
  console.log('Connected to the Database')
})