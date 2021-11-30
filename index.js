const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const app = express()
const recipe = require('./routes')
const mongoose = require('mongoose')
const http=require('http')
const dotenv = require('dotenv');

var router = express.Router()
var Recipe = require('./recipe.schema.js')

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}))
app.use(logger('dev'))
app.use('/recipe', recipe)


dotenv.config({path: './.env'});

const DB = (process.env.DB_REMOTE)

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(con =>{
    console.log("database connected");
    });


const port = process.env.PORT || '4000'
app.set('port', port)
const server = http.createServer(app).listen(port, () => {
  console.log(`listening on ${port}`)
})


  module.exports = app