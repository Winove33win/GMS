
const mysql = require('mysql2/promise');

const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE,
  DB_PORT = 3306
} = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
  console.warn('[db] DB_* ausentes. Configure no Plesk.');

import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_CONN_LIMIT,
} = process.env;

const missing = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'].filter((key) => {
  const value = process.env[key];
  return !value || String(value).trim() === '';
});

if (missing.length) {
  throw new Error(`Missing required database environment variables: ${missing.join(', ')}`);

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

  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: DB_CONN_LIMIT ? Number(DB_CONN_LIMIT) : 10,
  queueLimit: 0,
  timezone: 'Z',
});

export { pool };
export default pool;

