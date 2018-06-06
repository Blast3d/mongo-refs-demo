const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const usersController = require('./api/controllers/usersController');
const hobbiesController = require('./api/controllers/hobbiesController');

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/users', usersController);
server.use('/api/hobbies', hobbiesController);

mongoose
  .connect('mongodb://localhost/cs10')
  .then(() => console.log(`Connected To MongoDB`))
  .catch(err =>
    console.log({
      error: err,
      message: 'connection refused make sure you start your mongo server'
    })
  );
const port = 5551;
server.listen(port, () => console.log(`server listening on ${port}`));
