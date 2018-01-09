const proxy = require('express-http-proxy');
const express = require('express');

// Yelp API Token
const ACCESS_TOKEN = 'qPL47CBIgMj1rjtXgx36yiCjAMs-bBHv77vQHm2opGv3AHz6wchClw7GQDR7XUau5AmWW5JkUZ7eaZ5U1MyEAIBde_VJZoZLofo1QsEvcRWeLO7Bpi99gPSC0CFUWnYx';

var app = express();

app.use('/yelpGraphQLAPI', proxy('https://api.yelp.com/v3/graphql', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
    return proxyReqOpts;
  },
  userResHeaderDecorator: (headers) => {
    headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    return headers;
  }})
);

app.listen(3020, () => console.log('GraphQL Proxy server listening on port 3000.'));

exports = module.exports = app;