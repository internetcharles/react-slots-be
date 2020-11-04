const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('slot-machine-react routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
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
          name: "charlie",
          money: 100
        }));
  });
});
