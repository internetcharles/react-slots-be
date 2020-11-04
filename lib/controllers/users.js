const { Router } = require('express');
const User = require('../models/user');

module.exports = Router()
  .post('/', (req, res, next) => {
    User.insert(req.body)
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(notes => res.send(notes))
      .catch(next);
  });
