const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')

// Yelp API Token
const ACCESS_TOKEN =
  'qPL47CBIgMj1rjtXgx36yiCjAMs-bBHv77vQHm2opGv3AHz6wchClw7GQDR7XUau5AmWW5JkUZ7eaZ5U1MyEAIBde_VJZoZLofo1QsEvcRWeLO7Bpi99gPSC0CFUWnYx'
const YELP_API_URL = 'https://api.yelp.com/v3/graphql'

var app = express()

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}))

app.use(bodyParser.json());

app.post('/api', (req, resp) => {
  request.post({
    url: YELP_API_URL,
    proxy: 'http://29119:tue@proxy-west.aero.org:8080',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    },
    json: true,
    body: req.body
  }, (err, res, body) => {
    resp.send(body);
  })
})

app.listen(3020)
