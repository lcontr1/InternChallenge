const express = require('express')
const app = express()
const PORT = 8080

const client = require('./db/client')
client.connect()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

//base route that returns hello world
app.get('/hello', (req, res) => {
      res.send('Hello, World!');
  });

//router adding /api prefix
app.use('/api', require('./api/images'))

//listen to port
app.listen(PORT, () => {
    // PORT.keepAliveTimeout(120000)
    console.log(`Server listening on port ${PORT}`)
})