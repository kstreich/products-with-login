let express = require('express')
let bp = require('body-parser')
require('./server/db/mlab-config')

let server = express()
const PORT = process.env.PORT || 3000

server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))

//allow users to get data when not logged in
server.use('*', (req, res, next) => {
  if (req.method == "GET") {
    return next()
  }
  if (!req.session.uid) {
    return next(new Error('Please Login to Continue'))
  }
  if (req.method == "POST") {
    req.body.creatorId = req.session.uid
  }
  next()
})
//^^^ this will always be the same

//add in routes here!!!



//default error handler 
server.use('*', (error, req, res, next) => {
  res.status(error.status || 400).send({ message: error.message })
})
