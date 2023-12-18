const express = require('express');
const app = express();

const auth = require('./auth')

const apiUrl = "/api/v1";

app.use('/api', auth);

module.exports = app;