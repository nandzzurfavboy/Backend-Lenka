const express = require('express');

const app = express();

const Profile = require('./apiProfile');

const api = '/api/v1';

app.use(api, Profile);
module.exports = app;
