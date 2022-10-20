const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
const dotenv = require('dotenv')
const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

dotenv.config();

var corsOptions = {
    origin: [
      "https://laureanomarenco.vercel.app",
      "http://localhost:3000",
    ],
    headers: "*",
    methods: "*",
};


server.use(cors(corsOptions));

server.use('/api', routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;