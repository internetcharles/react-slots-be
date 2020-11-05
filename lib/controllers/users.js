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
  })
  .put('/:id', async(req, res, next) => {
    try {
      const response = await User.update(req.params.id, req.body);
      res.send(response);
    } catch(error) {
      next(error);
    }
  });
