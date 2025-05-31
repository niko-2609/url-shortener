require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const URLShortenHandler = require('./handlers/urlShortener')
const RedirectHandler = require('./handlers/redirect')

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

app.use(cors());

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:shorturl', RedirectHandler)
app.post('/api/shorturl', URLShortenHandler)

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
