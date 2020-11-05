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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id=$1',
      [id]
    );

    return new User(rows[0]);
  }

  static async update(id, user) {
    const { rows } = await pool.query(
      `UPDATE users
      SET name=$1,
          money=$2
      WHERE id=$3
      RETURNING *
      `, [user.name, user.money, id]
    );

    return new User(rows[0]);
  }
};
