const express = require('express')

// controllers
const UserController = require('./app/controllers/UserController')

// rotas
const routes = express.Router()

routes.post('/users', UserController.search)

module.exports = routes