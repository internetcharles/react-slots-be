const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('slot-machine-react routes', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('returns a new user via POST', () => {
    return request(app)
      .post('/users')
      .send({
        name: 'charlie',
        money: 100
      })
      .then(res => expect(res.body)
        .toEqual({
          id: expect.any(String),
          name: 'charlie',
          money: 100
        }));
  });

  it('returns a user by id via GET', () => {
    return request(app)
      .get('/users/1')
      .then(res => expect(res.body)
        .toEqual({
          id: expect.any(String),
          name: 'charlie',
          money: 100
        }));
  });
});
