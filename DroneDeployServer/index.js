const express = require('express')
const app = express()
const PORT = 8080
const client = require('./db/client')
client.connect()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');

//base route that returns hello world
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//import to be able to run using the cors mechanism
app.use(cors());

//router adding /api prefix
app.use('/api', require('./api'))

//listen to port
app.listen(PORT, () => {
    PORT.keepAliveTimeout(120000)
    console.log(`Server listening on port ${PORT}`)
})