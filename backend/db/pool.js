const mysql = require('mysql2/promise');

const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE,
  DB_PORT = 3306
} = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
  console.warn('[db] DB_* ausentes. Configure no Plesk.');
}

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Z'
});

module.exports = pool;
