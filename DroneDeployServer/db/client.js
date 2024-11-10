const { Client } = require('pg');

const dbName = "ddimages"

const client = new Client(`postgres://localhost:5432/${dbName}`)

module.exports = client;