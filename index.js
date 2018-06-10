const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path')
const Logger = require('./api/util/Logger');

const logger = new Logger();
const app = express();

require('dotenv-safe').config({
  path: path.join(__dirname, '.env'),
  allowEmptyValues: true
});

// Database connection
mongoose.connect(`mongodb://${process.env.MONGO_URL}`, () => {
  logger.info('Conected to mongodb');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

// Server
const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  logger.info(`Playlist API launched on port ${port}`);
});