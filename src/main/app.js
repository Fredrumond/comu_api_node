const express = require('express')
const app = express()
const setupRoutes = require('../main/routes')

app.use(express.json())

setupRoutes(app)

module.exports = app