const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));

app.get('/info', (req, res) => {
  res.send('this is a proxy service');
});

app.use('/overview',
  createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
  }));

app.use('/qa',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }));

app.use('/products',
  createProxyMiddleware({
    target: 'http://localhost:3004',
    changeOrigin: true,
  }));

app.use('/reviews',
  createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true,
  }));

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);
// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

module.exports = app;
