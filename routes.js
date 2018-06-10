const express = require('express');

// Reqwire controllers
const playlistController = require('./api/controllers/playlistController');

const routes = express();

// Main route
routes.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Hello there :)'
  })
});

// Routes
routes.post('/playlist', playlistController.post);
routes.get('/playlist/:id', playlistController.get);
routes.put('/playlist/:id', playlistController.update);

module.exports = routes;