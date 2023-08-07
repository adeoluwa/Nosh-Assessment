const express = require('express')

const bodyParser = require('body-parser')

const rateLimit  = require('express-rate-limit')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const app = express()

// Connect to MongoDB
