const pool = require('../../lib/utils/pool');
const User = require('./user');
const fs = require('fs');

describe('User class', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert user via post', async() => {
    const user = await User.insert({
      name: 'Charlie',
      money: 100
    });

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id=$1',
      [user.id]
    );
    const mungedUser = new User(rows[0]);
    expect(mungedUser).toEqual(user);
  });

  it('should find user by id via GET', async() => {
    const user = await User.insert({
      name: 'Bill',
      money: 1000
    });

    const userById = (await User.findById(user.id));
    expect(userById).toEqual(user);
  });
});
