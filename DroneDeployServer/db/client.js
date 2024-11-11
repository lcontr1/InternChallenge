const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Use the apiKey to make API requests
// console.log('API Key:', apiKey);
const dbName = "ddimages"

const client = new Client(`postgres://localhost:5432/${dbName}`)

module.exports = client;