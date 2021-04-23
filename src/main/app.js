const express = require('express')
const cors = require('cors')
const app = express()
const setupRoutes = require('../main/routes')

app.use(express.json())
app.use(cors())

setupRoutes(app)

module.exports = app