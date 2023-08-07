const express = require('express')

const bodyParser = require('body-parser')

const rateLimit  = require('express-rate-limit')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const app = express()

// dotenv.config()

mongoose.set('strictQuery', false)

// Middleware
app.use(express.json())

// DB config
if (process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

const PORT = process.env.PORT || 8001

const CONNECTION = process.env.CONNECTION_URL

const mongoConnect = async () => {
    try {
        await mongoose.connect(CONNECTION)
        app.listen(PORT, () => console.log('App listening on port: ' + PORT))
    } catch (error) {
        console.log(error.message)
    }
}
mongoConnect()

// Endpoints
app.get('/', (req, res) => res.status(200).send('Welcome'))
