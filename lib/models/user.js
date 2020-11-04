const pool = require('../utils/pool');

module.exports = class User {
  id;
  name;
  money;

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.money = user.money;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, money) VALUES ($1, $2) RETURNING *',
      [user.name, user.money]
    );

    return new User(rows[0]);
  }
};
