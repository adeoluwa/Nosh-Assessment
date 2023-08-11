const express = require('express')

const bodyParser = require('body-parser')

const rateLimit  = require('express-rate-limit')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const cors = require('cors')

const helmet = require('helmet')

const morgan = require('morgan')

const routes = require('./routes')

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.set('strictQuery', false)

// Middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use('/api/', routes);
app.use(limiter);

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

// Test Connection 
app.get('/', (req, res) => res.status(200).send('Welcome'))
