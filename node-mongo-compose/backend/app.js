const express   = require('express')
const restful   = require('node-restful')
const server    = express()
const mongoose  = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb') // esse cara vai fazer a conexão com o banco que será levantado no container de banco

// Teste
server.get('/', (req, res, next) => res.send('Backend'))

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// DOM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')

// Start Server
server.listen(3000)

